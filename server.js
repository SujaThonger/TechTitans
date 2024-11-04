const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const cors = require('cors');
const path = require('path');
const fetch = require('node-fetch');
const bcrypt = require('bcrypt');



require('dotenv').config();

// Initialize express app
const app = express();


app.use('/uploads', express.static('uploads'));

// Middleware for parsing form data
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public', 'Multi_signIN')));
app.use(cors()); // Add this if you need to handle cross-origin requests
app.use(bodyParser.json());



// MongoDB connection
mongoose.connect('mongodb+srv://sanidhyakiit:w003TDgfj2mG96He@cluster0.yfsrp.mongodb.net/Employee', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 50000
})
    .then(() => console.log("MongoDB connected"))
    .catch((err) => console.log(err));

const employeeSchema = new mongoose.Schema({
    name: String,
    email: String,
    phone: Number,
    password: String,
    createdAt: { type: Date, default: Date.now }, // When the employee was added
    leftDate: Date  // Optionally track when they are removed
});

const Employee = mongoose.model('employee_users', employeeSchema);

// Serve the HTML form
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/Multi_signIN/hh.html');
});

// Handle Employee sign-up form submission
app.post('/signup/employee', (req, res) => {
    const newEmployee = new Employee({
        name: req.body.employeeName,
        email: req.body.employeeEmail,
        phone: req.body.employeePhone,
        password: req.body.employeePassword
    });

    newEmployee.save()
        .then(() => res.send("Employee sign-up successful!"))
        .catch((err) => res.status(500).send("Error saving employee: " + err));
});


// API route to get the total number of employees in real-time
app.get('/employeeCount', async (req, res) => {
    try {
        const count = await Employee.countDocuments();  // Get total count of documents in Employee collection
        res.json({ count: count });
    } catch (error) {
        console.error('Error fetching employee count:', error);
        res.status(500).json({ message: 'Error fetching employee count' });
    }
});


// Prime Member Schema (with password, subscription_fees, and createdAt fields)
const primeMemberSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: Number, required: true },  // Added phone field
    password: { type: String, required: true },  // Added password field
    subscription_fees: { type: String, required: true },  // Added subscription_fees field
    createdAt: { type: Date, default: Date.now },  // Added createdAt field with default to current date
    membershipDate: { type: Date, default: Date.now }  // Track membership start date (you can remove this if not needed)
}, { collection: 'prime_members' });

const PrimeMember = mongoose.model('PrimeMember', primeMemberSchema);

module.exports = PrimeMember;




// API to get the total count of Prime Members from 'prime_members' collection in employee database
app.get('/prime-members/count', async (req, res) => {
    try {
        const primeMembersCount = await PrimeMember.countDocuments();  // Count all documents in prime_members collection
        res.json({ count: primeMembersCount });
    } catch (error) {
        res.status(500).send('Error fetching Prime Members count: ' + error);
    }
});


// Trainers schema
const trainerSchema = new mongoose.Schema({
    name: String,
    email: String,
    specialization: String,
    // Add other relevant fields if necessary
}, { collection: 'Trainers' });  // Specify the collection name

const Trainer = mongoose.model('Trainer', trainerSchema);

// API to get the total count of Trainers from the 'Trainers' collection
app.get('/trainers/count', async (req, res) => {
    try {
        const trainersCount = await Trainer.countDocuments();  // Count all documents in Trainers collection
        res.json({ count: trainersCount });
    } catch (error) {
        res.status(500).send('Error fetching Trainers count: ' + error);
    }
});



// POST API to send email
app.post('/sendEmail', (req, res) => {
    const { email, subject, message } = req.body;

    if (!email || !subject || !message) {
        return res.status(400).json({ message: 'All fields are required.' });
    }

    // Create mail options dynamically based on form input
    const mailOptions = {
        from: 'q88884536@gmail.com', // Store email in .env
        to: email,
        subject: subject,
        text: message,
        html: `<p>${message}</p>`
    };

    // Transporter to send mail via Gmail
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'q88884536@gmail.com',
            pass: 'ynbzawiqmgczehzu' // Store password in .env
        }
    });

    // Send email using transporter
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error sending email:', error);
            return res.status(500).json({ message: 'Error sending email', error: error.message });
        }
        console.log('Email sent: ' + info.response);
        res.status(200).json({ message: 'Email sent successfully!' });
    });
});




app.get('/get-speed', async (req, res) => {
    try {
        let speed = await speedtest.getSpeed();
        res.json({ speed });
    } catch (e) {
        console.error(e.message);
        res.status(500).json({ error: e.message });
    }
});



// Define schema and model for Admin in Employee database
const adminSchema = new mongoose.Schema({
    name: String,
    email: String,
    phone: Number,
    password:String,
    position: String // Assuming position is a field
}, { collection: 'ADMIN' });  // Make sure 'ADMIN' is the collection name

const Admin = mongoose.model('Admin', adminSchema);

// Route to fetch admin data
app.get('/admin/profile', async (req, res) => {
    try {
        const adminData = await Admin.findOne();  // Find the first admin document (you can modify this to be dynamic)
        res.json(adminData);  // Return the admin data as JSON
    } catch (error) {
        res.status(500).send("Error fetching admin profile: " + error);
    }
});

// Route to handle admin profile updates
app.post('/admin/profile/update', async (req, res) => {
    const { id, name, email, phone, position } = req.body;

    // Log incoming request data for debugging
    console.log('Update Request:', req.body);

    if (!id) {
        return res.status(400).json({ success: false, message: 'Admin ID is required.' });
    }

    try {
        // Ensure the ID format is correct (use 'new' with ObjectId)
        const adminId = new mongoose.Types.ObjectId(id); // Correct use of 'new'

        // Find the admin by ID and update their details
        const updatedAdmin = await Admin.findByIdAndUpdate(adminId, {
            name,
            email,
            phone,
            position
        }, { new: true }); // 'new: true' returns the updated document

        if (!updatedAdmin) {
            console.error('Admin not found for ID:', id);
            return res.status(404).json({ success: false, message: 'Admin not found.' });
        }

        res.json({ success: true, message: 'Admin profile updated successfully.', updatedAdmin });
    } catch (error) {
        console.error('Error updating admin profile:', error); // More detailed error logging
        res.status(500).json({ success: false, message: 'Error updating profile: ' + error.message });
    }
});


app.get('/employees', async (req, res) => {
    try {
        const employees = await Employee.find();  // Fetch all employee documents
        res.json(employees);  // Return the employee data as JSON
    } catch (error) {
        console.error('Error fetching employee data:', error);
        res.status(500).json({ message: 'Error fetching employee data' });
    }
});

// API route to get all trainer data
app.get('/trainers', async (req, res) => {
    try {
        const trainers = await Trainer.find();  // Fetch all trainer documents
        res.json(trainers);  // Return the trainer data as JSON
    } catch (error) {
        console.error('Error fetching trainer data:', error);
        res.status(500).json({ message: 'Error fetching trainer data' });
    }
});


app.post('/signup/trainer', async (req, res) => {
    const { trainerName, trainerSpecialization } = req.body;

    try {
        const newTrainer = new Trainer({ name: trainerName, specialization: trainerSpecialization });
        await newTrainer.save();
        res.status(201).json({ message: 'Trainer added successfully!' });
    } catch (error) {
        console.error('Error adding trainer:', error);
        res.status(500).json({ message: 'Error adding trainer' });
    }
});


app.delete('/trainers/:id', async (req, res) => {
    try {
        const trainer = await Trainer.findByIdAndDelete(req.params.id);
        if (!trainer) {
            return res.status(404).json({ message: 'Trainer not found' });
        }
        res.json({ message: 'Trainer removed successfully' });
    } catch (error) {
        console.error('Error removing trainer:', error);
        res.status(500).json({ message: 'Error removing trainer' });
    }
});

// API route to delete an employee by ID
app.delete('/employees/:id', async (req, res) => {
    try {
        const employeeId = req.params.id;  // Get the employee ID from the request parameters
        const deletedEmployee = await Employee.findByIdAndDelete(employeeId); // Delete the employee

        if (!deletedEmployee) {
            return res.status(404).json({ message: 'Employee not found' }); // Return 404 if employee not found
        }

        res.json({ message: 'Employee removed successfully' }); // Return success message
    } catch (error) {
        console.error('Error removing employee:', error);
        res.status(500).json({ message: 'Error removing employee' }); // Return 500 error in case of failure
    }
});



//prime members counting

app.get('/prime-members/count', async (req, res) => {
    try {
        const primeMembersCount = await PrimeMember.countDocuments();  // Count all documents in prime_members collection
        res.json({ count: primeMembersCount });
    } catch (error) {
        res.status(500).send('Error fetching Prime Members count: ' + error);
    }
});



// all prime members

app.get('/prime-members', async (req, res) => {
    try {
        const primeMembers = await PrimeMember.find();  // Fetch all Prime Member documents
        res.json(primeMembers);  // Return the Prime Member data as JSON
    } catch (error) {
        res.status(500).send('Error fetching Prime Members: ' + error);
    }
});


// Route to handle adding a new prime member
app.post('/signup/prime-member', async (req, res) => {
    const { name, email, phone, password, createdAt, subscription_fees } = req.body;

    if (!name || !email || !phone || !password || !subscription_fees) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    try {
        const newPrimeMember = new PrimeMember({
            name: name,
            email: email,
            phone: phone,
            password: password,
            createdAt: createdAt,
            subscription_fees: subscription_fees
        });

        await newPrimeMember.save();
        res.status(201).json({ message: 'Prime member added successfully!' });
    } catch (error) {
        console.error('Error adding prime member:', error);
        res.status(500).json({ message: 'Error adding prime member' });
    }
});


//remove prime member
app.delete('/prime-members/:id', async (req, res) => {
    try {
        const primeMember = await PrimeMember.findByIdAndDelete(req.params.id);  // Find and delete Prime Member by ID
        if (!primeMember) {
            return res.status(404).json({ message: 'Prime Member not found' });
        }
        res.json({ message: 'Prime Member removed successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error removing Prime Member' });
    }
});



app.get('/employees/monthly', async (req, res) => {
    try {
        const employeesByMonth = await Employee.aggregate([
            {
                $group: {
                    _id: {
                        month: { $month: "$createdAt" },
                        year: { $year: "$createdAt" }
                    },
                    employeeAdditions: { $sum: 1 }
                }
            },
            { $sort: { "_id.year": 1, "_id.month": 1 } }
        ]);

        const employeesRemovedByMonth = await Employee.aggregate([
            {
                $match: { leftDate: { $exists: true } }
            },
            {
                $group: {
                    _id: {
                        month: { $month: "$leftDate" },
                        year: { $year: "$leftDate" }
                    },
                    employeeRemovals: { $sum: 1 }
                }
            },
            { $sort: { "_id.year": 1, "_id.month": 1 } }
        ]);

        res.json({ employeesByMonth, employeesRemovedByMonth });
    } catch (error) {
        console.error('Error fetching employee data by month:', error);
        res.status(500).json({ message: 'Error fetching employee data' });
    }
});


app.get('/prime-members/monthly', async (req, res) => {
    try {
        const primeMembersByMonth = await PrimeMember.aggregate([
            {
                $group: {
                    _id: {
                        month: { $month: "$membershipDate" },
                        year: { $year: "$membershipDate" }
                    },
                    primeMemberAdditions: { $sum: 1 }
                }
            },
            { $sort: { "_id.year": 1, "_id.month": 1 } }
        ]);

        res.json({ primeMembersByMonth });
    } catch (error) {
        console.error('Error fetching prime member data by month:', error);
        res.status(500).send('Error fetching Prime Members count: ' + error);
    }
});


//total sale 

app.get('/prime-members/subscription-sum', async (req, res) => {
    try {
        // Calculate the total subscription fees by summing the 'subscription_fees' field
        const totalSubscriptionFees = await PrimeMember.aggregate([
            {
                $group: {
                    _id: null,
                    total: { $sum: { $toDouble: "$subscription_fees" } }  // Convert subscription_fees to number and sum it
                }
            }
        ]);

        // Return the total subscription fees
        if (totalSubscriptionFees.length > 0) {
            res.json({ total: totalSubscriptionFees[0].total });
        } else {
            res.json({ total: 0 });
        }
    } catch (error) {
        console.error('Error fetching total subscription fees:', error);
        res.status(500).json({ message: 'Error fetching total subscription fees' });
    }
});





// Login route
app.post('/login/admin', async (req, res) => {
    const { email, password } = req.body;

    try {
        // Check if email or password is missing
        if (!email || !password) {
            return res.status(400).json({ success: false, message: 'Email and password are required' });
        }

        // Find the admin in the 'ADMIN' collection within the 'Employee' database
        const admin = await Admin.findOne({ email });

        if (!admin) {
            return res.status(400).json({ success: false, message: 'Admin not found' });
        }

        // Check if the password field exists in the admin document
        if (!admin.password) {
            return res.status(500).json({ success: false, message: 'Admin password is missing in the database' });
        }

        console.log('Password from request:', password);
        console.log('Password from database:', admin.password);

        // Compare passwords directly (without bcrypt)
        if (password.trim() === admin.password.trim()) {
            return res.status(200).json({ success: true });
        } else {
            return res.status(400).json({ success: false, message: 'Invalid password' });
        }

    } catch (error) {
        console.error('Error during admin login:', error.message);
        return res.status(500).json({ success: false, message: `Server error: ${error.message}` });
    }
});


///Employee login
app.post('/login/employee_users', async (req, res) => {
    const { email, password } = req.body;

    try {
        // Check if email or password is missing
        if (!email || !password) {
            return res.status(400).json({ success: false, message: 'Email and password are required' });
        }

        // Find the admin in the 'ADMIN' collection within the 'Employee' database
        const employee = await Admin.findOne({ email });

        if (!employee) {
            return res.status(400).json({ success: false, message: 'Admin not found' });
        }

        // Check if the password field exists in the admin document
        if (!employee.password) {
            return res.status(500).json({ success: false, message: 'Admin password is missing in the database' });
        }

        console.log('Password from request:', password);
        console.log('Password from database:', employee.password);

        // Compare passwords directly (without bcrypt)
        if (password.trim() === employee.password.trim()) {
            return res.status(200).json({ success: true });
        } else {
            return res.status(400).json({ success: false, message: 'Invalid password' });
        }

    } catch (error) {
        console.error('Error during admin login:', error.message);
        return res.status(500).json({ success: false, message: `Server error: ${error.message}` });
    }
});




/// Route to fetch sales report for Prime Members
app.get('/reports/sales', async (req, res) => {
    try {
        // Fetch all Prime Members using the correct PrimeMember model
        const primeMembers = await PrimeMember.find();  // Fetch all Prime Members

        // Calculate total sales (sum of all subscription fees)
        const totalSales = await PrimeMember.aggregate([
            {
                $group: {
                    _id: null,
                    totalSales: { $sum: { $toDouble: "$subscription_fees" } }  // Sum of subscription fees
                }
            }
        ]);

        const totalCount = primeMembers.length;  // Total count of Prime Members
        const totalSalesAmount = totalSales.length > 0 ? totalSales[0].totalSales : 0;  // Total sales amount

        res.json({
            primeMembers,
            totalCount,
            totalSales: totalSalesAmount
        });
    } catch (error) {
        console.error('Error fetching sales report:', error);
        res.status(500).json({ message: 'Error fetching sales report' });
    }
});



// Route to fetch all collections and their documents
app.get('/collections', async (req, res) => {
    try {
        // Get all collection names from the 'Employee' database
        const collections = await mongoose.connection.db.listCollections().toArray();

        // Prepare a result array to hold collection data
        let result = [];

        // Loop through each collection to fetch its documents
        for (let collection of collections) {
            const collectionName = collection.name;  // Get the collection name
            const collectionData = await mongoose.connection.db.collection(collectionName).find({}).toArray();  // Fetch all documents in the collection

            // Push the collection name and its documents into the result array
            result.push({
                collectionName: collectionName,
                documents: collectionData
            });
        }

        // Send the result back as JSON
        res.json(result);
    } catch (error) {
        console.error('Error fetching collections:', error.message);
        res.status(500).json({ message: 'Error fetching collections', error: error.message });
    }
});






// Employee Login Route
app.post('/login/employee_users', async (req, res) => {
    const { email, password } = req.body;

    try {
        if (!email || !password) {
            return res.status(400).json({ success: false, message: 'Email and password are required' });
        }

        const employee = await Employee.findOne({ email });
        if (!employee) {
            return res.status(401).json({ success: false, message: 'Invalid email or password' });
        }

        const isMatch = await bcrypt.compare(password, employee.password);
        if (!isMatch) {
            return res.status(401).json({ success: false, message: 'Invalid email or password' });
        }

        const token = jwt.sign({ id: employee._id }, 'your_jwt_secret', { expiresIn: '1h' });

        res.json({ success: true, token, message: 'Login successful!' });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
});






// Start the server
app.listen(4000, () => {
    console.log("Server running on port 4000");
});





