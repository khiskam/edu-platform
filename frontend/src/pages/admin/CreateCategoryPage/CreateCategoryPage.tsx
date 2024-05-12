// import { yupResolver } from "@hookform/resolvers/yup";
// import { Button, Form, Spin, Typography } from "antd";
// import { useForm } from "react-hook-form";

// import { Container, FormField } from "@/components";

// import { FormData, inputs, schema } from "./fields";
// import { PageLayout } from "./styled";

// export const CreateCategoryPage = () => {
//   const { control } = useForm<FormData>({
//     mode: "onChange",
//     criteriaMode: "all",
//     resolver: yupResolver(schema),
//   });

//   return (
//     <Container>
//       <PageLayout>
//         <Spin spinning={false}>
//           <Typography.Title level={2}>Добавить категорию</Typography.Title>

//           <Form layout="vertical">
//             {inputs.map(({ key, ...value }) => (
//               <FormField<FormData>
//                 key={key}
//                 controller={{ control, name: key }}
//                 {...value}
//               />
//             ))}

//             <Button type="primary" htmlType="submit">
//               Добавить
//             </Button>
//           </Form>
//         </Spin>
//       </PageLayout>
//     </Container>
//   );
// };

export const CreateCategoryPage = () => {
  return <></>;
};
