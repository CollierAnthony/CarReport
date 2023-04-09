import dayjs from "dayjs";
import { Button, Card, Timeline } from "flowbite-react";
import { type GetStaticProps, type NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { api, type RouterOutputs } from "~/utils/api";

const CarPage: NextPage = () => {
  const router = useRouter();
  const { id } = router.query;
  if (!id) return null;
  if (typeof id !== "string") return null;

  const { data: posts, isLoading } = api.car.getCarPosts.useQuery({
    carId: id,
  });

  const { data: car } = api.car.getCarInfos.useQuery({
    carId: id,
  });
  if (isLoading) return <div>loading...</div>;

  if (!posts) return <div>No posts</div>;
  return (
    <>
      <Head>
        <title>Ma voiture</title>
      </Head>
      <h1>Car ID : {id}</h1>

      <p className="text-1xl m-6 mx-auto text-center font-bold text-slate-800">
        Voici tous les entretiens de votre
      </p>
      <h1 className="m-6 mx-auto text-center text-4xl font-bold text-emerald-400">
        {car?.make} {car?.model}
      </h1>

      {/* {posts?.map((post) => (
        <div key={post.id}>
          <h3>{post.title}</h3>
          <p>{post.content}</p>
          <p>{post.postCategory.title}</p>
          <img src={post.pictures[0]?.url} alt="" />
        </div>
      ))} */}

      <PostsFeed posts={posts} />
    </>
  );
};

type CarPosts = RouterOutputs["car"]["getCarPosts"];
interface PostsFeedProps {
  posts: CarPosts;
}

const PostsFeed = ({ posts }: PostsFeedProps) => {
  if (!posts) return null;

  return (
    <>
      <Timeline>
        {posts?.map((post) => (
          <Timeline.Item key={post.id}>
            <Timeline.Point />
            <Timeline.Content>
              <Timeline.Time>
                {dayjs(post.dateOfRepair).format("DD/MM/YYYY")}
              </Timeline.Time>
              <Timeline.Title>{post.postCategory.title}</Timeline.Title>
              <Timeline.Body>
                <Card horizontal={true} imgSrc={post.pictures[0]?.url}>
                  <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                    {post.title}
                  </h5>
                  <p className="font-normal text-gray-700 dark:text-gray-400">
                    {post.content}
                  </p>
                </Card>
              </Timeline.Body>
              <Button color="gray">Learn More</Button>
            </Timeline.Content>
          </Timeline.Item>
        ))}
      </Timeline>
    </>
  );
};

export default CarPage;
