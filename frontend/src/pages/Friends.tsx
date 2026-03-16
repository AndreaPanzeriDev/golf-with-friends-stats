import {  useMutation, useQueryClient } from "@tanstack/react-query";
import { Button, Form, Input, Modal } from "antd";
import NavBar from "../component/layout/NavBar";
import { useTranslation } from "react-i18next";
import { Plus } from "lucide-react";
import FriendsList from "../component/layout/Friends/FriendsList";
import { useState } from "react";

type InputUser = {
  name: string
  email: string
}

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
      queryClient.invalidateQueries({queryKey: ['users']});
      setOpenModal(false);
      form.resetFields();
    },
  });

  function handleOnFinish() {
    const values = form.getFieldsValue();
    mutation.mutate(values);
  }

  return (
    <>
    <Modal title={t("friends:modal.addFriend")} onOk={handleOnFinish} open={openModal} onCancel={() => setOpenModal(false)}>
      <p>{t("friends:modal.description")}</p>
      <Form layout="vertical" className="py-5!" form={form}>
        <Form.Item label={t("friends:modal.form.name.label")} name={"name"} rules={[{required:true, message: t("friends:modal.form.name.required")}]}>
          <Input  placeholder={t("friends:modal.form.name.placeholder")}/>
        </Form.Item>
        <Form.Item label={t("friends:modal.form.email.label")} name={"email"} rules={[{required: true, message: t("friends:modal.form.email.required")}, {pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, message: t("friends:modal.form.email.invalid")}]}>
          <Input autoComplete="false" placeholder={t("friends:modal.form.email.placeholder")}/>
        </Form.Item>
      </Form>
    </Modal>



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
