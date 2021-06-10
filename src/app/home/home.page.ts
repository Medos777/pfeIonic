import { Component ,Inject} from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef, MatDialogConfig } from '@angular/material/dialog';
import { AddCollectePage } from '../Collecte/add-collecte/add-collecte.page';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(
    
    private matDialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef:MatDialogRef<AddCollectePage>
  ) {}
opencomp(){
  console.log('hello');
  
  const dialogConfig = new MatDialogConfig();
  dialogConfig.autoFocus = true;
  dialogConfig.disableClose = true;
  dialogConfig.width="50%";
  this.matDialog.open(AddCollectePage, dialogConfig);
  
}
}