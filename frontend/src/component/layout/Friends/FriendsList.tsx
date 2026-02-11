import { useQuery } from "@tanstack/react-query";
import { Avatar, Button, Card } from "antd";
import { EllipsisVertical, Target, TrendingDown, Trophy } from "lucide-react";
import Stats from "./Stats";

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
      fetch(import.meta.env.VITE_BASE_URL + "api/users").then((res) => {
        console.log(res);
        return res.json();
      }),
  });

  if (isLoading) {
    return "Loading...";
  }

  if (error) {
    return "Error: " + error.message;
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 gap-5 p-5">
      {data?.map((user) => {
        return (
          <Card
            key={user.id}
            title={<div><Avatar className="bg-[#20553b]!">{user.name.substring(0,2).toUpperCase()}</Avatar></div>}
            extra={
              <Button
                className="border-none!"
                onClick={() => console.log("click")}
              >
                <EllipsisVertical />
              </Button>
            }
          >
            <div className="flex justify-around">
              <Stats
                label="Vittorie"
                points={17}
                icon={<Trophy size={16} className="text-green-500" />}
              />
              <Stats
                label="Sconfitte"
                points={12}
                icon={<TrendingDown size={16} className="text-red-500" />}
              />
              <Stats
                label="Punteggio Medio"
                points={13}
                icon={<Target size={16} className="text-black" />}
              />
            </div>
          </Card>
        );
      })}
    </div>
  );
}

export default FriendsList;
