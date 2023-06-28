import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { MessagesComponent } from './messages.component';
import { MessageService } from '../message.service';

describe('MessagesComponent', () => {
  let component: MessagesComponent;
  let fixture: ComponentFixture<MessagesComponent>;
  let messageService: MessageService;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [MessagesComponent],
      providers: [MessageService],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MessagesComponent);
    component = fixture.componentInstance;
    messageService = TestBed.inject(MessageService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display messages when there are messages in the service', () => {
    const messages = ['Message 1', 'Message 2'];
    messages.forEach((msg) => messageService.messages.push(msg));

    fixture.detectChanges();

    const messagesContainer = fixture.nativeElement.querySelector('.messages');
    expect(messagesContainer.querySelector('.messages h2').textContent).toEqual(
      'Messages'
    );
    const messageElements = messagesContainer.querySelectorAll('.message');
    expect(messageElements.length).toBe(messages.length);

    messageElements.forEach((element: HTMLElement, index: number) => {
      expect(element.textContent).toContain(messages[index]);
    });
  });

  it('should clear messages', () => {
    messageService.messages.push('Message 1');

    fixture.detectChanges();

    const clearButton = fixture.nativeElement.querySelector('.clear');
    clearButton.click();

    fixture.detectChanges();

    const messageElements = fixture.nativeElement.querySelectorAll('.message');
    expect(messageElements.length).toBe(0);
  });
});
