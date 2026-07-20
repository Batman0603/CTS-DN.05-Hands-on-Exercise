import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NotificationService } from '../../services/notification.service';

@Component({

  selector: 'app-notification',

  standalone: true,

  imports: [
    CommonModule
  ],

  templateUrl: './notification.html',

  styleUrl: './notification.css',

  /*
      Component-level Provider

      This creates a NEW NotificationService instance
      for every NotificationComponent.

      Unlike providedIn:'root', this service instance
      is NOT shared across the application.
  */

  providers: [
    NotificationService
  ]

})

export class Notification{

  constructor(

    public notificationService: NotificationService

  ) {}

  addMessage() {

    this.notificationService.addNotification(

      "New notification at " + new Date().toLocaleTimeString()

    );

  }

}