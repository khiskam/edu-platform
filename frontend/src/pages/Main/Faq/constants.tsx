import { CollapseProps, Typography } from "antd";

export const FAQ: CollapseProps["items"] = [
  {
    key: "1",
    label: "Что представляет собой ваша образовательная платформа?",
    children: (
      <Typography.Text>
        Наша платформа предлагает онлайн-лекции и задания для студентов. Лекции добавляются через
        WYSIWYG-редактор, а к каждой лекции можно прикрепить задания в виде тестовых вопросов.
      </Typography.Text>
    ),
  },
  {
    key: "2",
    label: "Как зарегистрироваться на платформе?",
    children: (
      <Typography.Text>
        Чтобы зарегистрироваться, нажмите на кнопку "Регистрация" в верхнем правом углу страницы и
        следуйте инструкциям. Вам нужно будет указать свою электронную почту и создать пароль.
      </Typography.Text>
    ),
  },
  {
    key: "3",
    label: "Какие курсы доступны на платформе?",
    children: (
      <Typography.Text>
        У нас доступны различные курсы по различным тематикам, по школьным предметам. Полный список
        курсов можно найти на странице "Модули".
      </Typography.Text>
    ),
  },
  {
    key: "4",
    label: "Как проходить тесты?",
    children: (
      <Typography.Text>
        После изучения лекции вам будет предложено пройти тест. Выберите правильные ответы на
        вопросы и нажмите "Отправить". Вы получите мгновенную обратную связь по результатам.
      </Typography.Text>
    ),
  },
];
