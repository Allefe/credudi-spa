import { animation, trigger, animateChild, group, transition, animate, style, query } from '@angular/animations';

export const enterLeaveCenterAnimation = trigger(
    'enterLeaveCenterAnimation', [
      transition(
        ':enter', [
          style({opacity: 0}),
          animate('500ms', style({'opacity': 1}))
        ]
      ),
      transition(
        ':leave', [
          style({'opacity': 1}),
          animate('500ms', style({opacity: 0}))
        ]
      )
    ]
  );

export const enterLeaveRightAnimation = trigger(
    'enterLeaveRightAnimation', [
      transition(
        ':enter', [
          style({transform: 'translateX(100%)', opacity: 0}),
          animate('500ms', style({transform: 'translateX(0)', 'opacity': 1}))
        ]
      ),
      transition(
        ':leave', [
          style({transform: 'translateX(0)', 'opacity': 1}),
          animate('500ms', style({transform: 'translateX(100%)', opacity: 0}))
        ]
      )
    ]
  );

export const enterLeaveLeftAnimation = trigger(
    'enterLeaveLeftAnimation', [
      transition(
        ':enter', [
          style({transform: 'translateX(-100%)', opacity: 0}),
          animate('500ms', style({transform: 'translateX(0)', 'opacity': 1}))
        ]
      ),
      transition(
        ':leave', [
          style({transform: 'translateX(0)', 'opacity': 1}),
          animate('500ms', style({transform: 'translateX(-100%)', opacity: 0}))
        ]
      )
    ]
  );