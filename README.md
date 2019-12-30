

# EventPlanner
### About
This web application was developed as part of a Software Engineering module (CS4098) in a group of four. The main aim of the module was to learn about dealing with clients, building reasonable requirements and achieving agreed deliverables in a short space of time (few weeks).

We were tasked with designing and building an event planning application as a web platform with a set of basic features and a mock ticketing and payment system. 

#### Developers:
Seamus Dwyer
Luke Agnew
Ben Stratford
Sean Durban
# Setup
### Note: This setup is for target machine, Ubuntu 16.04

## Setting up the git repository
Clone the repo
```
git clone https://github.com/dwyerse/EventPlanner.git
```
Enter the repo folder
```
cd EventPlanner
```
Run the install script
```
sudo chmod +x install.sh
./install.sh
```

# Running the Application
Run the launch script
```
sudo chmod +x launch.sh
./launch
```

# Testing
All tests expect local app server on port 3000 and mongoDB server running.
### Unit Tests
Unit test files found in ./test
<br>In a new terminal (in EventPlanner folder):
```
npm test
```

# Errors
### Port already in use
Following commands work in 'git bash' terminal
```
netstat -ano
```
Then search for PID relating to relevant address and port
localhost is generally set as: 127.0.0.1:PORTNO
```
taskkill //PID *ENTER-PID-HERE* //F
```
A success message should follow
