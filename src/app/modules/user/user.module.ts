import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { UserRoutingModule } from "@app/modules/user/user-routing.module";
import { EditComponent } from "./components/edit/edit.component";
import { FormsModule } from "@angular/forms";
import { MaterialCompositionModule } from "@app/modules/material-composition/material-composition.module";
import { StoreModule } from "@ngrx/store";
import { USER_FEATURE_NAME } from "@app/store/user/user-feature-name";
import { userReducer } from "@app/store/user/user.reducer";
import { EffectsModule } from "@ngrx/effects";
import { UserEditEffects } from "@app/store/user/edit/user-edit.effects";
import { UserListEffects } from "@app/store/user/list/user-list.effects";

@NgModule({
  declarations: [EditComponent],
  imports: [
    CommonModule,
    UserRoutingModule,
    FormsModule,
    MaterialCompositionModule,
    StoreModule.forFeature(USER_FEATURE_NAME, userReducer),
    EffectsModule.forFeature([
      UserEditEffects,
      UserListEffects
    ])
  ]
})
export class UserModule { }
