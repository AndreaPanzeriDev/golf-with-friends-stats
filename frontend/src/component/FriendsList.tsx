import { useQuery } from "@tanstack/react-query";

type User = {
  id: number;
  name: string;
  email: string;
  created_at: string;
  updated_at: string;
};

function FriendsList() {
  const { isLoading, error, data } = useQuery<User[]>({
    queryKey: ["users"],
    queryFn: () =>
      fetch(import.meta.env.VITE_BASE_URL + "api/users").then((res) => {console.log(res); return res.json()}),
  });

  if (isLoading) {
    return "Loading...";
  }

  if (error) {
    return "Error: " + error.message;
  }

  return <>{data?.map(user => <div key={user.id}>{user.name}</div>)}</>;
}

export default FriendsList;
