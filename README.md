# 🎮 Reaction Time Lab (Three.js + React)

## 📌 Project Overview

The **Reaction Time Lab** is an interactive experiment designed to measure a user's **reaction time and accuracy** in identifying visual stimuli. The system displays randomly generated **letters and numbers** that fall from the top of the screen, and the user must respond quickly using the keyboard.

This project demonstrates key concepts from **Human-Computer Interaction (HCI)** such as:

* Reaction time measurement
* User performance tracking
* Real-time feedback
* Direct manipulation interaction

---

## 🎯 Objective

The goal of this experiment is to:

* Measure how quickly users respond to visual stimuli
* Evaluate accuracy under time pressure
* Analyze performance using basic statistical metrics

---

## 🕹️ How It Works

1. A random **letter (A–Z)** or **number (0–9)** appears at the top of the screen.
2. The object falls downward continuously.
3. The user must press:

   * **A key → if the object is a LETTER**
   * **L key → if the object is a NUMBER**
4. The system records:

   * Reaction time (in milliseconds)
   * Whether the response was correct or incorrect
   * Accuracy(in %)
5. A new object appears after each trial.

---

## 📊 Metrics Tracked

The system continuously updates the following performance metrics:

* **Trials** → Total number of attempts
* **Correct Responses** → Number of correct inputs
* **Accuracy** →Track accuracy and performance over multiple trials
* **Average Reaction Time (Avg RT)** → Mean reaction time across trials
* **Last Reaction Time** → Reaction time of the most recent input


---
🔗 Live Demo

Try the live version of the Reaction Time Lab here:https://hci-cg-reaction-time-lab-git-main-neharehan2005s-projects.vercel.app/


## ⚙️ Technologies Used

* **React.js** → UI and state management
* **Three.js** → 3D rendering and animation
* **HTML Canvas** → Dynamic text generation
* **JavaScript (ES6)** → Logic and event handling

---

## 🧠 HCI Concepts Implemented

* **Direct Manipulation** → Immediate feedback when user presses a key
* **Temporal Feedback** → Reaction time measured instantly
* **Consistency** → Same keys (A/L) used throughout
* **Low Cognitive Load** → Simple binary decision (letter vs number)

---

## ⏱ Reaction Time Calculation

Reaction time is calculated using:

* Start time is recorded when the object appears
* End time is recorded when the user presses a key

**Formula:**
Reaction Time (ms) = Current Time − Start Time

This is implemented using `performance.now()` for high precision timing.

---

## 🔄 System Flow

1. Spawn object/Generate random object(letter/number)
2. Start timer
3. Wait for user input
4. Calculate reaction time
5. Update statistics
6. Spawn next objec/tGenerate next random object(letter/number

---

## ⚠️ Current Limitations

* Missed objects (no key press) are not counted as trials
* No data export (CSV) for further analysis

---

## 🚀 Future Improvements

* Add **CSV export** for experiment data
* Implement **difficulty scaling** (increase falling speed)
* Add **sound feedback**
* Support **multiple input modes**

---

## 🎨 UI Features

* Neon cyber-style interface
* Real-time stats panel
* Smooth falling animation
* Clear visual distinction between letters and numbers

---

## 📷 Controls

* Press **A** → For Letters
* Press **L** → For Numbers

---

## ✅ Conclusion

This project successfully demonstrates an interactive **reaction time measurement system** using modern web technologies. It provides real-time feedback and basic statistical analysis, making it suitable for HCI experiments and usability studies.


