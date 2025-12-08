# Augmented Reality Project using MINDAR
This project uses the MINDAR library, as described by its creator on the official [MINDAR] (https://hiukim.github.io/mind-ar-js-doc/) Documentation. It is open-source and supports both image tracking and face tracking.

## Tool Installation

### For code editing:
Προτείνεται το [Brackets](https://brackets.io/) αλλά μπορείτε να χρησιμοποιήσετε όποιο άλλο θέλετε

### For running the code locally:
The code in this project uses the camera, and it should also be tested on a mobile device. For that reason, a local HTTP server is required It is recommended to use the HTTP server module of Python. (It is already included in macOS & Linux systems.). For windows user:
1. Goto [Python.org](https://www.python.org/downloads/)
2. In the Downloads section, click Python “3.x.x”
3. Select the Windows Installer to download the setup file
4. Run the installer
5. Check the box “Add Python 3.x.x to PATH”
6. Complete the installation and close the window

To start the local server:
1. Open the command line (type cmd in the search bar)
2. Use the following commands to navigate to your project folder:

   cd <folder name>
   cd..
   dir

3. Start the local server:
    py -3 -m http.server

This will run the local server on the default port 8000, or you can specify another port if you wish.

4. Open your browser and type:
   localhost:8000

You will see the folders and files that can be executed locally.

### Cloning the Repository and Creating a GitHub Page
If you do not already have a GitHub account, create one using your university email at [Githhub](Github.com). Log in and navigate to the course repository. 

Click Fork to copy the repository into your own account. After forking, you must modify the repository settings to create your own GitHub Page (Settings → Pages). The code is now executable. You can already view the augmentation if you use the default 3 markers (xxx.png) located inside the folder assets/targets.

Congratulations! You now have the base code of your AR application ready to work with. 

### Git Setup and Workflow for Students

Download and Install Git:

1. Go to [https://git-scm.com/downloads](https://git-scm.com/downloads).  
2. Download the installer for your operating system.  
3. Run the installer and keep the default options. Make sure **Git Bash** and **Git GUI** are included.  
4. Finish the installation.

### 2. Configure Git

1. Open **Git Bash** (installed with Git).  
2. Set your name and email (used for commits):
   
   git config --global user.name "Your Name"
   git config --global user.email "your_email@domain.com"

### Git GUI for Workflow
1. Open Git GUI.
2. Clone the Repository:
3. Click Clone Existing Repository
4. Paste the repository URL
5. Choose a local folder and click Clone
6. Make changes locally in your editor (e.g., Brackets, VS Code).
7. Refresh Git GUI:
8. Click Rescan to detect file changes
9. Stage changes:
10. Select the files in Unstaged Changes
11. Click Stage Changed
12. Commit changes:
13. Write a descriptive message in Commit Message
14. Click Commit
15. Push to GitHub:
16. Go to Remote → Push…
17. Select origin and branch (main or master)
18. Click Push



....    

## Δημιουργία ψηφιακού περιεχομένου
### Δημιουργία της-ων εικόνας-ων - marker-s που ενεργοποιεί-ούν την επαύξηση:
Η εφαρμογή που έχετε δουλεύει ήδη με το  xxx.png αρχείο που βρίσκεται στον φάκελο targets, μέσα στον φάκελο assets. Μπορείτε να δοκιμάσετε την εφαρμογή, ενεργοποιώντας την επαύξηση με αυτό το αρχείο. 
Επίσης, προσέξτε ότι μέσα στον ίδιο φάκελο υπάρχει ένα αρχείο με το ίδιο όνομα xxx αλλά η επέκταση που έχει είναι .mind Αυτό συμβαίνει γιατί μια εικόνα πρέπει να υποστεί επεξεργασία ώστε να χρησμοποιηθεί σαν marker.

1. Για να χρησιμοποιήσετε το δικό σας marker, αφού το δημιουργήσετε (ένα png αρχείο εικόνας), συνδεθείτε στο [image tracker compiler](https://hiukim.github.io/mind-ar-js-doc/tools/compile) και σύρετε το αρχείο -α στο ειδικό πλαίσιο και πατήστε <start>. 
2. Τοποθετείστε και τα δυο αρχεία μέσα στον φάκελο assets/targets ώστε η εφαρμογή να είναι εκτελέσιμη και μακριά από τον φυσικό χώρο… 
3. Για να δημιουργήσετε περισσότερα markers πρέπει να σύρετε ταυτόχρονα πολλά png files στο ειδικό πλαίσιο
Περισσότερες πληροφορίες μπορείτε να βρείτε [εδώ](https://hiukim.github.io/mind-ar-js-doc/quick-start/compile).

**Για την εργασία πρέπει να δημιουργήσετε τουλάχιστον τρία (τρία) markers στο οποία θα συνδέσετε ψηφιακό περιεχόμενο**

### Δημιουργία ψηφιακού περιεχομένου
Κάθε marker πρέπει να αντιστοιχεί σε ψηφιακό περιεχόμενο που θα έχει σκοπό να εμπλουτίσει την εμπειρία του χρήστη. Για τη δημιουργία του ψηφιακού περιεχομένου μπορεί να ανήκει στα παρακάτω είδη, ανάλογα με τις ανάγκες της εργασίας που έχετε επιλέξει:

3D Model (*.gltf) + Ήχος (*.mp3)


