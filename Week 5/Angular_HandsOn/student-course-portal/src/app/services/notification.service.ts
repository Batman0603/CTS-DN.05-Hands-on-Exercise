import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  private notifications: string[] = [];

  constructor() {}

  addNotification(message: string): void {

    this.notifications.push(message);

  }

  getNotifications(): string[] {

    return this.notifications;

  }

  clearNotifications(): void {

    this.notifications = [];

  }

}