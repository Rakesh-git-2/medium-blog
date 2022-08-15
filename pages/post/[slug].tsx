import { GetServerSideProps } from "next";
import React, { FC } from "react";
import Header from "../../components/Header";
import { sanityClient, urlFor } from "../../sanity";
import { Post } from "../../typings";
import PortableText from "react-portable-text";

interface IPost {
  post: Post;
}

const Post = (props: IPost) => {
  console.log(props.post);
  return (
    <div>
      <Header />
      <img
        className="h-40 w-full object-cover"
        src={urlFor(props.post.mainImage).url()}
        alt=""
      />
      <article className="mx-auto max-w-3xl p-5">
        <h1 className="mt-10 mb-3 text-3xl">{props.post.title}</h1>
        <h2 className="mb-2 text-xl font-light text-gray-500">
          {props.post.description}
        </h2>
        <div className="flex items-center space-x-2">
          <img
            className="h-10 w-10 rounded-full"
            src={urlFor(props.post.author.image).url()}
            alt=""
          />
          <p className="text-sm font-extralight">
            Blog post by
            <span className="text-green-600">
              {" " + props.post.author.name + " "}
            </span>
            - Published at {new Date(props.post._createdAt).toLocaleString()}
          </p>
        </div>
        <div className="mt-10">
          <PortableText
            dataset={process.env.NEXT_PUBLIC_SANITY_DATASET}
            projectId={process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}
            content={props.post.body}
          ></PortableText>
        </div>
      </article>
    </div>
  );
};

export default Post;

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const queryDB = `*[_type =="post" && slug.current == $slug][0]{
        _id,
         title,
         slug,
         author->{
         name,
         image
       },
       _createdAt,
       mainImage,
       description,
       body
       }`;
  const post = await sanityClient.fetch(queryDB, { slug: query?.slug });
  if (!post) {
    return {
      notFound: true,
    };
  }
  return {
    props: {
      post,
    },
  };
};
