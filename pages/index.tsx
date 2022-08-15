import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import Header from "../components/Header";
import { sanityClient } from "../sanity";
import { Post } from "../typings";
import { urlFor } from "../sanity";

interface Props {
  posts: Post[];
}

const Home = ({ posts }: Props) => {
  return (
    <div className="mx-auto max-w-7xl">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <div className="flex items-center justify-between border-y border-black bg-yellow-400 py-10 lg:py-10">
        <div className="space-y-5 px-10 ">
          <h1 className="max-w-xl font-serif text-6xl">
            <span className="underline decoration-black decoration-4">
              Medium
            </span>{" "}
            is a place to read write and connect
          </h1>
          <h2>
            It's easy and free to post your thinking on any topic and connect
            with millions of readers.
          </h2>
        </div>
        <img
          className=" hidden h-32 md:inline-flex lg:h-64"
          src="http://www.graphicpie.com/wp-content/uploads/2020/11/red-among-us-png-842x1024.png"
        ></img>
      </div>
      <div className="grid grid-cols-1 gap-3  sm:grid-cols-2 md:gap-6 md:pad-6 lg:grid-cols-3 py-5 md:py-8">
        {posts.map((post: Post) => (
          <Link key={post._id} href={`/post/${post.slug.current}`}>
            <div className="group cursor-pointer overflow-hidden rounder-lg border">
              <div className="max-h-44 overflow-hidden">
                <img src={urlFor(post.mainImage).url()} alt="" />
              </div>
              <div className="flex justify-between bg-white p-5 ">
                <div className="">
                  <p className="text-lg font-bold">{post.title}</p>
                  <p className="text-xs">
                    {post.description} by {post.author.name}
                  </p>
                </div>
                <img
                  className="h-10 wi-10 rounded-full"
                  src={urlFor(post.author.image).url()}
                  alt=""
                />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Home;

export const getServerSideProps = async () => {
  try {
    const query = `*[_type =="post"]{
      _id,
       title,
       slug,
       author->{
       name,
       image
     },
     _createdAt,
     mainImage,
     description
     }`;
    const posts = await sanityClient.fetch(query);

    return {
      props: {
        posts,
      },
    };
  } catch (e) {}
};
