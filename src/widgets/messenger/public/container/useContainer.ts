import { useForm } from "react-hook-form";

import { useGetMeQuery } from "@/services/authService/authEndpoints";
import { UserType } from "@/services/authService/lib/authEndpoints.types";
import {
  useGetArrayOfLastMsgQuery,
  useGetDialogMessagesQuery, useSendMessageMutation
} from "@/services/messengerService/messengerEndpoints";
import { MessengerFormSchema, messengerSchema } from "@/widgets/messenger/local/messengerSchema/messengerSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/router";

export const useContainer = () => {
  const {
    control,
    setValue,
    watch,
  } = useForm<MessengerFormSchema>({
    defaultValues: {
      message: ""
    },
    mode: "onChange",
    resolver: zodResolver(messengerSchema)
  });

  const { query, replace } = useRouter();
  const sent = query?.sent as string || "";

  const { data, isLoading } = useGetArrayOfLastMsgQuery({
    cursor: undefined,
    pageSize: undefined,
    searchName: undefined
  });
  const { data: me } = useGetMeQuery() as { data: UserType };
  const { data: dialogData } = useGetDialogMessagesQuery({
    cursor: undefined,
    dialogPartnerId: +sent,
    pageSize: 5,
    searchName: undefined
  }, { skip: !sent });
  const [sendMessage] = useSendMessageMutation();

  const message = watch('message')
  const lastMessages = data?.items;
  const dialogPartner = lastMessages?.find(msg => msg.ownerId === +sent || msg.receiverId === +sent);
  const dialogMessages = dialogData?.items;
  const { userId } = me;


  const onClickUserOpenChatHandler = (sent: number) =>
    void replace({ query: { sent } }, undefined, {
      shallow: true
    });
  const onSendMsgHandler = () => {
    if(sent){
      sendMessage({ message, receiverId: +sent })
      setValue('message','')
    }
  }


  return {
    control,
    dialogMessages,
    dialogPartner,
    lastMessages,
    message,
    onClickUserOpenChatHandler,
    onSendMsgHandler,
    userId,
  };
};