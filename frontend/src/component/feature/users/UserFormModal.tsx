import { Form, Input, Modal, type FormInstance } from "antd";
import { useTranslation } from "react-i18next";
import type { InputUser } from "../../../types/user";




interface UserFormModalProps {
    mode: 'create' | 'update';
    isOpen: boolean
    isClose: () => void;
    form: FormInstance<InputUser>
    onFinish: () => void;
}


function UserFormModal({ mode, isOpen, isClose, form, onFinish }: UserFormModalProps) {
    const { t } = useTranslation(["friends"]);

    let modalTitle = t("friends:modal.addFriend");
    let modalDescription = t("friends:modal.description");

    if (mode === 'update') {
        modalTitle = t("friends:modal.updateFriend");
        modalDescription = t("friends:modal.description_update")
    }
    return (
        <Modal title={modalTitle} onOk={onFinish} open={isOpen} onCancel={isClose}>
            <p>{modalDescription}</p>
            <Form layout="vertical" className="py-5!" form={form}>
                <Form.Item label={t("friends:modal.form.name.label")} name={"name"} rules={[{ required: true, message: t("friends:modal.form.name.required") }]}>
                    <Input placeholder={t("friends:modal.form.name.placeholder")} />
                </Form.Item>
                <Form.Item label={t("friends:modal.form.email.label")} name={"email"} rules={[{ required: true, message: t("friends:modal.form.email.required") }, { pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, message: t("friends:modal.form.email.invalid") }]}>
                    <Input autoComplete="false" placeholder={t("friends:modal.form.email.placeholder")} />
                </Form.Item>
            </Form>
        </Modal>
    )

}


export default UserFormModal;