// import { yupResolver } from "@hookform/resolvers/yup";
// import { Button, Form, Spin, Typography } from "antd";
// import { useForm } from "react-hook-form";

// import { Container, FormField } from "@/components";

// import { PageLayout } from "../CategoriesPage/styled";
// import { FormData, inputs, schema } from "./fields";

// export const UpdateTaskPage = () => {
//   const { control, handleSubmit } = useForm<FormData>({
//     mode: "onChange",
//     criteriaMode: "all",
//     resolver: yupResolver(schema),
//   });

//   const onSubmit = handleSubmit(async (data) => console.log(data));

//   return (
//     <Container>
//       <PageLayout>
//         <Spin spinning={false}>
//           <Typography.Title level={2}>Редактировать задание</Typography.Title>

//           <Form layout="vertical" onFinish={onSubmit}>
//             {inputs.map(({ key, ...value }) => (
//               <FormField<FormData>
//                 key={key}
//                 controller={{ control, name: key }}
//                 {...value}
//               />
//             ))}

//             <Button type="primary" htmlType="submit">
//               Редактировать
//             </Button>
//           </Form>
//         </Spin>
//       </PageLayout>
//     </Container>
//   );
// };

export const UpdateTaskPage = () => {
  return <></>;
};
