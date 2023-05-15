const Customer = require("../models/customersModels");
const joi = require("joi");
const bcrypt = require("bcrypt");
const mongoose = require("mongoose")

exports.createCustomer = async (req, res) => {
    try {
        // validation using joi library
        const customerSchema = joi.object({
            fullname: joi.string().min(3).required(),
            email: joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
            password: joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required().min(6).max(30),
            confirmPassword: joi.ref("password"),
            country: joi.string().required(),
            state: joi.string().required(),
            city: joi.string().required(),
            language: joi.string().required(),
            active: joi.boolean(),
        });
        const { error } = customerSchema.validate(req.body);
        if (error) return res.status(400).json({
            success: false,
            message: error.message
        });

        const { fullname, email, password, country, state, city, language, active } = req.body;

        // exists customer
        const existCustomer = await Customer.findOne({ email });
        if (existCustomer) return res.status(401).json({
            success: false,
            message: "This customer is already exists"
        });

        // hashing password
        let salt = await bcrypt.genSalt(10);
        let hashpassword;
        try {
            hashpassword = await bcrypt.hash(password, salt)
        } catch (error) {
            return res.status(400).json({
                success: false,
                message: "Password hashing occured error"
            });
        };

        const addCustomer = new Customer({
            fullname,
            email,
            password: hashpassword,
            country,
            state,
            city,
            language,
            active: (active === "true" ? true : false)
        });

        try {
            await addCustomer.save();
        } catch (error) {
            console.log("Database error", error.message)
            return res.status(500).json({
                success: false,
                message: "Database error occured!"
            })
        };
        res.status(201).json({
            success: true,
            message: "Customer added successfully!",
            customer: addCustomer
        })

    } catch (error) {
        console.log("error occured", error.message)
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        })
    }
};

exports.getAllCustomer = async (req, res) => {
    try {

        let data = Customer.find();

        // pagination
        let page = Number(req.query.page) || 1;
        let limits = Number(req.query.limit) || 5;
        let skips = (page - 1) * limits;
        data = data.skip(skips).limit(limits)
        let allCustomer;
        try {
            allCustomer = await data.select('-__v -updatedAt');
        } catch (error) {
            return res.status(500).json({
                success: false,
                message: "Internal server error"
            })
        }

        // get total post 
        let totalPost;
        try {
            totalPost = await Customer.find();
            console.log()
        } catch (error) {
            return res.status(500).json({
                success: false,
                message: "Internal server error"
            })
        }
        res.status(200).json({
            success: true,
            message: "Get all customer",
            page_number: page,
            pageItems: allCustomer.length,
            totalPages: Math.ceil(totalPost.length / limits),
            totalPosts: totalPost.length,
            data: allCustomer
        })

    } catch (error) {
        console.log("error occured", error.message)
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        })
    }
};

exports.updateCustomerById = async (req, res) => {
    try {
        // // validation using joi library
        // const customerSchema = joi.object({
        //     fullname: joi.string().min(3),
        //     email: joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
        //     country: joi.string().min(2),
        //     state: joi.string().min(2),
        //     city: joi.string().min(2),
        //     language: joi.string().min(2),
        //     active: joi.boolean(),
        // });
        // const { error } = customerSchema.validate(req.body);
        // if (error) return res.status(400).json({
        //     success: false,
        //     message: error.message
        // });

        const id = req.params.id;
        if (!mongoose.isValidObjectId(id)) return res.status(422).json({ message: "This is not valid customer id!" });

        const { fullname, email, country, state, city, language, active } = req.body;

        const updateCustomerData = await Customer.findByIdAndUpdate({ _id: id }, {
            fullname,
            email,
            country,
            state,
            city,
            language,
            active: (active === "true" ? true : false)
        }, { new: true }).select("-password -__v -updatedAt");

        res.status(200).json({
            success: true,
            message: "Customer is updated successfully!",
            customer: updateCustomerData
        })


    } catch (error) {
        console.log("error occured", error.message)
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        })
    }
};

// Delete a customer
exports.deleteCustomerById = async (req, res) => {
    try {
        const id = req.params.id;
        if (!mongoose.isValidObjectId(id)) return res.status(422).json({ message: "This is not valid customer id!" });

        const deleteCustomerData = await Customer.findByIdAndDelete({ _id: id }, { new: true });
        if (!deleteCustomerData) return res.status(404).json({ message: "This customer is already deleted" })

        res.status(200).json({
            success: true,
            message: "Customer is deleted successfully!",
        })

    } catch (error) {
        console.log("error occured", error.message)
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        })
    }
}

