import { CollapseProps } from "antd/es/collapse";
import Typography from "antd/es/typography";

export const STEPS: CollapseProps["items"] = [
  {
    key: "step1",
    label: <Typography.Text strong>Шаг 1: Регистрация / Вход</Typography.Text>,
    children: (
      <Typography.Text>
        Начните своё образовательное путешествие с регистрации на платформе. Если у вас уже есть
        аккаунт, просто войдите, используя свои учетные данные. Это откроет доступ к множеству
        курсов и материалов, созданных для вашего личностного и профессионального роста.
      </Typography.Text>
    ),
  },
  {
    key: "step2",
    label: <Typography.Text strong>Шаг 2: Прохождение Лекций</Typography.Text>,
    children: (
      <Typography.Text>
        После входа в систему, выберите интересующий вас курс и приступайте к лекциям. Каждая лекция
        – это шаг к новым знаниям, которые помогут вам стать экспертом в выбранной области.
        Внимательно слушайте, конспектируйте и не стесняйтесь задавать вопросы.
      </Typography.Text>
    ),
  },
  {
    key: "step3",
    label: <Typography.Text strong>Шаг 3: Выполнение Заданий</Typography.Text>,
    children: (
      <Typography.Text>
        Закрепите полученные знания, выполняя задания. Практические упражнения и тесты помогут лучше
        усвоить материал и подготовиться к реальным задачам. Уделите этому шагу особое внимание –
        это ключ к вашему успеху.
      </Typography.Text>
    ),
  },
  {
    key: "step4",
    label: <Typography.Text strong>Шаг 4: Радоваться Результату</Typography.Text>,
    children: (
      <Typography.Text>
        Наслаждайтесь плодами своего труда! Полученные знания и навыки откроют перед вами новые
        возможности. Делитесь своими достижениями, гордитесь результатами и ставьте новые цели для
        дальнейшего развития.
      </Typography.Text>
    ),
  },
];
