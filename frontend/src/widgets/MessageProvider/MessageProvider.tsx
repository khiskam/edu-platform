import message from "antd/es/message";
import { NoticeType } from "antd/es/message/interface";
import { useCallback, useLayoutEffect } from "react";

import { useMessageStore } from "@/shared/store";

export const MessageProvider = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const content = useMessageStore(({ content }) => content);

  const showMessage = useCallback(
    (message: string, type: NoticeType) => {
      messageApi.open({
        type,
        content: message,
        duration: 4,
      });
      useMessageStore.setState({ content: undefined });
    },
    [messageApi]
  );

  useLayoutEffect(() => {
    if (content) {
      const { message, type } = content;
      showMessage(message, type);
    }
  }, [content, showMessage]);

  return <>{contextHolder}</>;
};
