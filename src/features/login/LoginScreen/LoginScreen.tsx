import { useUserRepository } from "@src/hooks";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { View } from "react-native";
import { ActivityIndicator, Appbar, Button, Snackbar, TextInput } from "react-native-paper";

export const LoginScreen = () => {
  const { t } = useTranslation("login");
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useUserRepository();

  const onSubmit = () => {
    login.mutate({ username, password });
  };

  return (
    <>
      <Appbar.Header>
        <Appbar.Content title={t("title")} />
      </Appbar.Header>
      <View className="flex-1 justify-center bg-background p-5 gap-3">
        {login.isLoading ? (
          <ActivityIndicator animating size={100} />
        ) : (
          <>
            <TextInput
              label={t("username")}
              left={<TextInput.Icon icon="account" />}
              value={username}
              onChangeText={setUsername}
            />
            <TextInput
              label={t("password")}
              right={<TextInput.Icon icon="eye" onPress={() => setShowPassword((prevState) => !prevState)} />}
              secureTextEntry={!showPassword}
              value={password}
              onChangeText={setPassword}
            />
            <Button className="self-center" mode="contained" onPress={onSubmit}>
              {t("submit")}
            </Button>
          </>
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
