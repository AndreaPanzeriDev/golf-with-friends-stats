import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Button, Form } from "antd";
import NavBar from "../component/layout/NavBar";
import { useTranslation } from "react-i18next";
import { Plus } from "lucide-react";
import FriendsList from "../component/layout/Friends/FriendsList";
import { useState } from "react";
import UserFormModal from "../component/feature/users/UserFormModal";
import type { InputUser } from "../types/user";



function Friends() {
  const { t } = useTranslation(["navbar", "friends"]);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [form] = Form.useForm<InputUser>();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (userData: InputUser) => {
      const response = await fetch(import.meta.env.VITE_BASE_URL + 'api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
      setOpenModal(false);
      form.resetFields();
    },
  });

  function handleOnFinish() {
    const values = form.getFieldsValue();
    console.log('ciao');
    mutation.mutate(values);
  }

  return (
    <>
      <UserFormModal mode="create" isOpen={openModal} isClose={() => setOpenModal(false)} form={form} onFinish={handleOnFinish} />
      <div className="flex flex-col h-full">
        <NavBar
          navbarName="Friends List"
          additionalComponent={
            <Button onClick={() => setOpenModal(true)} className="text-white! bg-[#20553b]! border-none! ml-3!">
              <Plus color="white" size={16} />
              {t("addFriend")}
            </Button>
          }
        />
        <div className={`w-full flex-1 bg-[#f6f8f6] overflow-y-auto`}>
          <FriendsList />
        </div>
      </div>
    </>
  );
}

export default Friends;
