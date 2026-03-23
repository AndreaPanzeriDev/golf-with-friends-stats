import { useQueryClient, useMutation, useQuery } from "@tanstack/react-query";
import { Avatar, Card, Dropdown, Modal, message } from "antd";
import { EllipsisVertical, Target, TrendingDown, Trophy } from "lucide-react";
import Stats from "./Stats";
import { useState } from "react";
import axios from "axios";

type User = {
  id: number;
  name: string;
  email: string;
  created_at: string;
  updated_at: string;
};

function FriendsList() {
  // Track the ID of the user we intend to delete
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
  const queryClient = useQueryClient();

  const { isLoading, error, data } = useQuery<User[]>({
    queryKey: ["users"],
    queryFn: () => axios.get(`${import.meta.env.VITE_BASE_URL}api/users`).then(res => res.data),
  });

  const { mutate: deleteUser, isPending } = useMutation({
    mutationFn: (userId: number) => 
      axios.delete(`${import.meta.env.VITE_BASE_URL}api/users/${userId}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      message.success("Utente eliminato con successo");
      setSelectedUserId(null); 
    },
    onError: () => {
      message.error("Errore durante l'eliminazione");
    }
  });

  if (isLoading) return "Loading...";
  if (error) return "Error: " + error.message;

  return (
    <>
      <Modal 
        open={!!selectedUserId} 
        onCancel={() => setSelectedUserId(null)} 
        onOk={() => selectedUserId && deleteUser(selectedUserId)} 
        confirmLoading={isPending}
        okText="Elimina" 
        okType="danger"
        title="Rimuovere Utente?"
      >
        <p>Premendo sul tasto rimuovi, l'utente verrà eliminato e non potrà più accedere al pannello di gioco.</p>
      </Modal>

      <div className="grid lg:grid-cols-3 md:grid-cols-1 gap-5 p-5">
        {data?.map((user) => (
          <Card
            key={user.id}
            title={
              <div className="flex items-center">
                <Avatar className="bg-[#20553b] mr-4">
                  {user.name.substring(0, 2).toUpperCase()}
                </Avatar>
                {user.name}
              </div>
            }
            extra={
              <Dropdown 
                menu={{ 
                  items: [{ 
                    key: 'delete', 
                    label: 'Delete', 
                    danger: true, 
                    onClick: () => setSelectedUserId(user.id) 
                  }] 
                }} 
                trigger={['click']}
              >
                <EllipsisVertical className="cursor-pointer" />
              </Dropdown>
            }
          >
            <div className="flex justify-around">
              <Stats label="Vittorie" points={17} icon={<Trophy size={16} className="text-green-500" />} />
              <Stats label="Sconfitte" points={12} icon={<TrendingDown size={16} className="text-red-500" />} />
              <Stats label="Punteggio Medio" points={13} icon={<Target size={16} className="text-black" />} />
            </div>
          </Card>
        ))}
      </div>
    </>
  );
}

export default FriendsList;