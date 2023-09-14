import { RegisterScreenProps } from "@src/features/login";
import { useUserRepository } from "@src/hooks";
import { PASSWORD_MIN_LENGTH } from "@src/util";
import { Formik } from "formik";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { View } from "react-native";
import { ActivityIndicator, Appbar, Button, HelperText, Snackbar, TextInput } from "react-native-paper";
import * as yup from "yup";
import { InferType } from "yup";

export const RegisterScreen = ({ navigation }: RegisterScreenProps) => {
  const { t } = useTranslation("register");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { register } = useUserRepository();

  const registerSchema = yup.object({
    username: yup.string().test("noSpaces", t("noSpace"), (value) => !value?.includes(" ")),
    email: yup.string().required(t("required")).email(t("notValidEmail")),
    password: yup
      .string()
      .required(t("required"))
      .min(PASSWORD_MIN_LENGTH, t("passwordMinLength", { PASSWORD_MIN_LENGTH })),
    passwordConfirm: yup
      .string()
      .required(t("required"))
      .min(PASSWORD_MIN_LENGTH, t("passwordMinLength", { PASSWORD_MIN_LENGTH }))
      .test("passwordsMath", t("confirmPasswordNoMatch"), (value, context) => context.parent.password === value),
  });

  type RegisterValues = InferType<typeof registerSchema>;

  const initialValues: RegisterValues = {
    username: "",
    email: "",
    password: "",
    passwordConfirm: "",
  };

  const onSubmit = (values: RegisterValues) => {
    register.mutate(values);
  };

  const goToLogin = () => {
    navigation.goBack();
  };

  return (
    <>
      <Appbar.Header>
        <Appbar.Content title={t("title")} />
      </Appbar.Header>
      <View className="flex-1 justify-center bg-background p-5">
        {register.isLoading ? (
          <ActivityIndicator animating size={100} />
        ) : (
          <Formik initialValues={initialValues} validationSchema={registerSchema} onSubmit={onSubmit}>
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
                  inputMode="email"
                  label={t("email")}
                  left={<TextInput.Icon icon="email" />}
                  value={formikProps.values.email}
                  onChangeText={formikProps.handleChange("email")}
                />
                <HelperText type="error" visible={!!formikProps.errors.email}>
                  {formikProps.errors.email}
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
                <TextInput
                  label={t("confirmPassword")}
                  right={
                    <TextInput.Icon icon="eye" onPress={() => setShowConfirmPassword((prevState) => !prevState)} />
                  }
                  secureTextEntry={!showConfirmPassword}
                  value={formikProps.values.passwordConfirm}
                  onChangeText={formikProps.handleChange("passwordConfirm")}
                />
                <HelperText type="error" visible={!!formikProps.errors.passwordConfirm}>
                  {formikProps.errors.passwordConfirm}
                </HelperText>
                <Button className="self-center" mode="contained" onPress={formikProps.submitForm}>
                  {t("submit")}
                </Button>
                <Button className="self-center" onPress={goToLogin}>
                  {t("register")}
                </Button>
              </View>
            )}
          </Formik>
        )}
      </View>
      <Snackbar
        action={{ onPress: () => register.reset(), label: t("dismiss") }}
        visible={register.isError}
        onDismiss={() => register.reset()}
      >
        {register.error ? t(register.error.message) : ""}
      </Snackbar>
    </>
  );
};
