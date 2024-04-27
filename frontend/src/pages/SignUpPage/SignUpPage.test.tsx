import { fireEvent, render, screen, waitFor } from "@testing-library/react";

import { SignUpPage } from "./SignUpPage";

describe("", () => {
  beforeEach(() => {
    render(<SignUpPage />);
  });

  it("should display errors about empty inputs", async () => {
    const errors = [
      "Поле Email обязательно для заполнения",
      "Поле Пароль обязательно для заполнения",
      "Поле Подтвердить пароль обязательно для заполнения",
    ];

    fireEvent.submit(screen.getByText("Зарегистрироваться"));

    const alerts = await screen.findAllByRole("alert");
    expect(alerts).toHaveLength(errors.length);

    for (let i = 0; i < alerts.length; ++i) {
      expect(alerts[i]).toHaveTextContent(errors[i]);
    }
  });

  it("should display errors about empty inputs", async () => {
    const errors = [
      "Поле Email обязательно для заполнения",
      "Поле Пароль обязательно для заполнения",
      "Поле Подтвердить пароль обязательно для заполнения",
    ];

    fireEvent.submit(screen.getByText("Зарегистрироваться"));

    const alerts = await screen.findAllByRole("alert");
    expect(alerts).toHaveLength(errors.length);

    for (let i = 0; i < alerts.length; ++i) {
      expect(alerts[i]).toHaveTextContent(errors[i]);
    }
  });

  it("should display errors about invalid data", async () => {
    const values = [
      { name: "email", target: { value: "123" } },
      { name: "password", target: { value: "123" } },
      { name: "confirmPassword", target: { value: "1234" } },
    ];

    const errors = [
      "Неверный формат email",
      "Минимальное кол-во символов: 6",
      "Пароли не совпадают",
    ];

    values.forEach(({ name, target }) => {
      fireEvent.input(screen.getByRole("textbox", { name }), { target });
    });

    fireEvent.submit(screen.getByText("Зарегистрироваться"));

    const alerts = await screen.findAllByRole("alert");
    expect(alerts).toHaveLength(errors.length);

    for (let i = 0; i < alerts.length; ++i) {
      expect(alerts[i]).toHaveTextContent(errors[i]);
    }
  });

  it("should not display errors", async () => {
    const values = [
      { name: "email", target: { value: "test@mail.ru" } },
      { name: "password", target: { value: "123456" } },
      { name: "confirmPassword", target: { value: "123456" } },
    ];

    values.forEach(({ name, target }) => {
      fireEvent.input(screen.getByRole("textbox", { name }), { target });
    });

    fireEvent.submit(screen.getByText("Зарегистрироваться"));

    await waitFor(() => {
      expect(screen.queryAllByRole("alert")).toHaveLength(0);
    });
  });
});
