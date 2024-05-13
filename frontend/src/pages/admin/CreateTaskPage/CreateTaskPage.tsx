// import { MinusCircleOutlined, PlusCircleOutlined } from "@ant-design/icons";
// import { yupResolver } from "@hookform/resolvers/yup";
// import {
//   Button,
//   Checkbox,
//   Flex,
//   Form,
//   Input,
//   Space,
//   Spin,
//   Typography,
// } from "antd";
// import { Controller, useFieldArray, useForm } from "react-hook-form";

import { Checkbox, Flex, Form, Typography } from "antd";

import { Container } from "@/components";

// import { Container } from "@/components";
// import { GAP } from "@/shared/constants";

// import { FormData, schema } from "./fields";
// import { PageLayout } from "./styled";

// export const CreateTaskPage = () => {
//   const {
//     control,
//     handleSubmit,
//     trigger,
//     formState: { errors },
//   } = useForm<FormData>({
//     mode: "onChange",
//     criteriaMode: "all",
//     resolver: yupResolver(schema),
//     defaultValues: {
//       answers: [
//         { isCorrect: false, value: "" },
//         { isCorrect: false, value: "" },
//       ],
//     },
//   });

//   const { fields, append, remove } = useFieldArray({
//     control,
//     name: "answers",
//   });

//   console.log(errors);
//   const onSubmit = handleSubmit(async (data) => console.log(data));

//   return (
//     <Container>
//       <PageLayout>
//         <Spin spinning={false}>
//           <Typography.Title level={2}>Добавить задание</Typography.Title>

//           <Form layout="vertical" onFinish={onSubmit}>
//             <Controller
//               control={control}
//               name="title"
//               render={({ field, fieldState: { error } }) => (
//                 <Form.Item
//                   label="Наименование"
//                   validateStatus={error ? "error" : "validating"}
//                   help={error?.message}
//                 >
//                   <Input {...field} />
//                 </Form.Item>
//               )}
//             />

//             <Controller
//               control={control}
//               name="description"
//               render={({ field, fieldState: { error } }) => (
//                 <Form.Item
//                   label="Описание"
//                   validateStatus={error ? "error" : "validating"}
//                   help={error?.message}
//                 >
//                   <Input.TextArea {...field} />
//                 </Form.Item>
//               )}
//             />

//             {fields.map((field, index) => (
//               <Form.Item
//                 label={`Ответ ${index + 1}`}
//                 validateStatus={
//                   errors.answers?.[0]?.value ? "error" : "validating"
//                 }
//                 help={errors.answers?.[0]?.value?.message}
//                 key={field.id}
//               >
//                 <Flex gap={GAP[12]}>
//                   <Flex gap={GAP[12]} style={{ width: "100%" }}>
//                     <Controller
//                       control={control}
//                       name={`answers.${index}.isCorrect`}
//                       render={({ field: { value, onChange, ...data } }) => (
//                         <Checkbox
//                           checked={value}
//                           onChange={(e) => {
//                             onChange(e);
//                             trigger("answers");
//                           }}
//                           {...data}
//                         />
//                       )}
//                     />
//                     <Controller
//                       control={control}
//                       name={`answers.${index}.value`}
//                       render={({ field }) => <Input {...field} />}
//                     />
//                   </Flex>
//                   {index !== 0 && index !== 1 && (
//                     <Button
//                       type="text"
//                       icon={<MinusCircleOutlined />}
//                       onClick={() => remove(index)}
//                     />
//                   )}
//                 </Flex>
//                 {index === fields.length - 1 && errors.answers?.root && (
//                   <Typography.Text type="danger">
//                     {errors.answers?.root?.message}
//                   </Typography.Text>
//                 )}
//               </Form.Item>
//             ))}

//             <Space size="large" direction="vertical">
//               <Button
//                 onClick={() => append({ isCorrect: false, value: "" })}
//                 disabled={fields.length === 6}
//                 icon={<PlusCircleOutlined />}
//               >
//                 Добавить ответ
//               </Button>
//               <Button type="primary" htmlType="submit">
//                 Сохранить
//               </Button>
//             </Space>
//           </Form>
//         </Spin>
//       </PageLayout>
//     </Container>
//   );
// };

export const CreateTaskPage = () => {
  return (
    <Container>
      <Form>
        <Flex gap={12} align="center" style={{ padding: "12px" }}>
          <Form.Item>
            <Checkbox>
              <div
                style={{
                  border: "1px solid #006ce7",
                  borderRadius: "8px",
                  padding: "8px",
                  width: "100%",
                }}
              >
                <Typography.Text>ыва</Typography.Text>
              </div>
            </Checkbox>
          </Form.Item>
        </Flex>
      </Form>
    </Container>
  );
};
