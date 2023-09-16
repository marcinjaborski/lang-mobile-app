import { LoginScreenProps } from "@src/features/layout";
import { useUserRepository } from "@src/hooks";
import { PASSWORD_MIN_LENGTH } from "@src/util";
import { Formik } from "formik";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { View } from "react-native";
import { ActivityIndicator, Appbar, Button, HelperText, Snackbar, TextInput } from "react-native-paper";
import * as yup from "yup";
import { InferType } from "yup";

export const LoginScreen = ({ navigation }: LoginScreenProps) => {
  const { t } = useTranslation("login");
  const [showPassword, setShowPassword] = useState(false);
  const { login } = useUserRepository();

  const loginSchema = yup.object({
    username: yup
      .string()
      .required(t("required"))
      .test("noSpaces", t("noSpace"), (value) => !value.includes(" ")),
    password: yup
      .string()
      .required(t("required"))
      .min(PASSWORD_MIN_LENGTH, t("passwordMinLength", { PASSWORD_MIN_LENGTH })),
  });

  type LoginValues = InferType<typeof loginSchema>;

  const initialValues: LoginValues = {
    username: "",
    password: "",
  };

  const onSubmit = ({ username, password }: LoginValues) => {
    login.mutate(
      { username, password },
      {
        onSuccess() {
          navigation.goBack();
        },
      },
    );
  };

  const goToRegister = () => {
    navigation.navigate("Register");
  };

  return (
    <>
      <Appbar.Header>
        <Appbar.Content title={t("title")} />
      </Appbar.Header>
      <View className="flex-1 justify-center bg-background p-5">
        {login.isLoading ? (
          <ActivityIndicator animating size={100} />
        ) : (
          <Formik initialValues={initialValues} validationSchema={loginSchema} onSubmit={onSubmit}>
            {(formikProps) => (
              <View>
                <TextInput
                  label={t("username")}
                  left={<TextInput.Icon icon="account" />}
                  value={formikProps.values.username}
                  onChangeText={formikProps.handleChange("username")}
                />
                <HelperText type="error" visible={!!formikProps.errors.username}>
                  {formikProps.errors.username}
                </HelperText>
                <TextInput
                  label={t("password")}
                  right={<TextInput.Icon icon="eye" onPress={() => setShowPassword((prevState) => !prevState)} />}
                  secureTextEntry={!showPassword}
                  value={formikProps.values.password}
                  onChangeText={formikProps.handleChange("password")}
                />
                <HelperText type="error" visible={!!formikProps.errors.password}>
                  {formikProps.errors.password}
                </HelperText>
                <Button className="self-center" mode="contained" onPress={formikProps.submitForm}>
                  {t("submit")}
                </Button>
                <Button className="self-center" onPress={goToRegister}>
                  {t("register")}
                </Button>
              </View>
            )}
          </Formik>
        )}
      </View>
      <Snackbar
        action={{ onPress: () => login.reset(), label: t("dismiss") }}
        visible={login.isError}
        onDismiss={() => login.reset()}
      >
        {login.error ? t(login.error.message) : ""}
      </Snackbar>
    </>
  );
};
