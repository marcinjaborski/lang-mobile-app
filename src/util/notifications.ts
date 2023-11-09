import * as Notifications from "expo-notifications";

export const registerForPushNotificationsAsync = async () => {
  const storedStatus = (await Notifications.getPermissionsAsync()).status;
  if (storedStatus !== "granted") {
    const requestedStatus = (await Notifications.requestPermissionsAsync()).status;
    if (requestedStatus !== "granted") {
      console.log("Failed to get push token for push notification!");
      return false;
    }
  }

  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldPlaySound: false,
      shouldShowAlert: true,
      shouldSetBadge: false,
    }),
  });

  return true;
};

const getDatesOfReminder = (numberOfDays: number) => {
  const dates = Array.from({ length: numberOfDays }).map(() => new Date());
  dates.forEach((date, index) => {
    date.setDate(date.getDate() + index + 1);
    date.setHours(20);
    date.setMinutes(0);
    date.setSeconds(0);
  });
  return dates;
};

export const scheduleDailyReminder = async (title: string, body: string) => {
  await Notifications.cancelAllScheduledNotificationsAsync();
  getDatesOfReminder(3).forEach((date) => {
    Notifications.scheduleNotificationAsync({
      content: {
        title,
        body,
      },
      trigger: { date },
    });
  });
};
