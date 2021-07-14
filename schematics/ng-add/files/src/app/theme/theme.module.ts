import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';

// @ts-ignore
import { AdminLayoutComponent } from './admin-layout/admin-layout.component';
// @ts-ignore
import { AuthLayoutComponent } from './auth-layout/auth-layout.component';
// @ts-ignore
import { SidebarComponent } from './sidebar/sidebar.component';
// @ts-ignore
import { UserPanelComponent } from './sidebar/user-panel.component';
// @ts-ignore
import { SidemenuComponent } from './sidemenu/sidemenu.component';
// @ts-ignore
import { AccordionDirective } from './sidemenu/accordion.directive';
// @ts-ignore
import { AccordionItemDirective } from './sidemenu/accordionItem.directive';
// @ts-ignore
import { AccordionAnchorDirective } from './sidemenu/accordionanchor.directive';
// @ts-ignore
import { SidebarNoticeComponent } from './sidebar-notice/sidebar-notice.component';
// @ts-ignore
import { TopmenuComponent } from './topmenu/topmenu.component';
// @ts-ignore
import { TopmenuPanelComponent } from './topmenu/topmenu-panel.component';
// @ts-ignore
import { HeaderComponent } from './header/header.component';
// @ts-ignore
import { BrandingComponent } from './widgets/branding.component';
// @ts-ignore
import { NotificationComponent } from './widgets/notification.component';
// @ts-ignore
import { TranslateComponent } from './widgets/translate.component';
// @ts-ignore
import { UserComponent } from './widgets/user.component';

@NgModule({
  declarations: [
    AdminLayoutComponent,
    AuthLayoutComponent,
    SidebarComponent,
    UserPanelComponent,
    SidemenuComponent,
    AccordionDirective,
    AccordionItemDirective,
    AccordionAnchorDirective,
    SidebarNoticeComponent,
    TopmenuComponent,
    TopmenuPanelComponent,
    HeaderComponent,
    BrandingComponent,
    NotificationComponent,
    TranslateComponent,
    UserComponent,
  ],
  imports: [SharedModule],
})
export class ThemeModule {}
