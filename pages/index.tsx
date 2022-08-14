import Head from "next/head";
import Image from "next/image";
import Header from "../components/Header";

const Home = () => {
  return (
    <div className="mx-auto max-w-7xl">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <div className="flex items-center justify-between border-y border-black bg-yellow-400 py-10 lg:py-0">
        <div className="space-y-5 px-10 ">
          <h1 className="max-w-xl font-serif text-6xl">
            <span className="underline decoration-black decoration-4">
              Medium
            </span>
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
    </div>
  );
};
export default Home;