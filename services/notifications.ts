import * as Notifications from "expo-notifications";
import { Marker } from "../types";

export class NotificationManager {
  private activeNotifications = new Map<number, any>();

  async requestPermissions(): Promise<void> {
    const status = await Notifications.getPermissionsAsync();
    if (!status.granted) {
      const req = await Notifications.requestPermissionsAsync();
      if (!req.granted) {
        throw new Error("Разрешение на уведомления не выдано");
      }
    }
  }

  async showNotification(marker: Marker, distance: number) {
    if (marker.id == null) return;
    if (this.activeNotifications.has(marker.id)) return;

    const id = await Notifications.scheduleNotificationAsync({
      content: {
        title: marker.title
        ? `Вы рядом с «${marker.title}»`
        : "Вы рядом с меткой!",
        body: `${distance.toFixed(0)} м от вас`
      },
      trigger: null,
    });

    this.activeNotifications.set(marker.id, id);
  }

  async removeNotification(markerId: number) {
    const notificationId = this.activeNotifications.get(markerId);
    if (!notificationId) return;

    await Notifications.dismissNotificationAsync(notificationId);
    this.activeNotifications.delete(markerId);
  }
}

export const notificationManager = new NotificationManager();
