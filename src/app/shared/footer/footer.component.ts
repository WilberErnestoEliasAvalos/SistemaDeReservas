import { Component } from '@angular/core';
import { materialModules } from '../../models/material-imports';

@Component({
    standalone: true,
    selector: 'app-footer',
    imports: [materialModules],
    templateUrl: './footer.component.html',
    styleUrl: './footer.component.css'
})
export class FooterComponent {

}
