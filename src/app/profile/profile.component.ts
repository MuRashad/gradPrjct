import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  username: string | undefined;
  userId: string | undefined;
  userType: string | null = null;
  userProfilePhoto: string | undefined; // User profile photo URL
  isPhotoChanged: boolean = false;
  isEditing: boolean = false; // Flag to track editing mode

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.loadProfileData(); // Load profile data on component initialization
  }

  loadProfileData(): void {
    const decodedToken = this.authService.decodeUserToken();
    if (decodedToken) {
      if (decodedToken.role === 'user') {
        this.userId = decodedToken.id;
        // Load username from localStorage if available
        this.username = localStorage.getItem('username') || decodedToken.username;
      } else if (decodedToken.role === 'pharmacy') {
        this.userId = decodedToken.id;
        // Load pharmacy username from localStorage if available
        this.username = localStorage.getItem('username') || decodedToken.pharmacy_username;
      }
      this.userType = decodedToken.role;

      // Load user profile photo from localStorage if available
      const storedPhoto = localStorage.getItem('userProfilePhoto');
      if (storedPhoto) {
        this.userProfilePhoto = storedPhoto;
        this.isPhotoChanged = true;
      }
    }
  }

  toggleEditing(): void {
    this.isEditing = !this.isEditing;
  }

  saveChanges(): void {
    // Perform save logic only if editing was enabled
    if (this.isEditing) {
      // Update username in localStorage
      localStorage.setItem('username', this.username);

      // For demonstration, simulate updating backend (replace with actual backend update logic)
      console.log(`Updated username: ${this.username}`);

      // After saving, disable editing mode
      this.isEditing = false;
    }
  }

  onPhotoSelected(event: any): void {
    const file: File = event.target.files[0];
    if (file) {
      const reader: FileReader = new FileReader();
      reader.onload = (e) => {
        this.userProfilePhoto = e.target?.result as string;
        this.isPhotoChanged = true; // Set flag to true when photo is changed
        // Store photo URL in localStorage
        localStorage.setItem('userProfilePhoto', this.userProfilePhoto);
      };
      reader.readAsDataURL(file);
    }
  }
}
