import { asyncHandler } from '../utilies/asynHandler.js'
import ApiError from '../utilies/ApiError.js'
import User from '../models/User.models.js';
import { uploadOnCloudinary } from '../utilies/Cloudinary.js'
import { ApiResponse } from '../utilies/ApiResonpse.js';


const registerUser = asyncHandler(async (req, res, next) => {
    // console.log(req.body)
    console.log(req.files)
    const { fullName, username, email, password } = req.body;
    const userexist = await User.findOne({
        $or: [{ email }, { username }]
    })
    if (userexist) {
        throw new ApiError(400, "Username or Email already Exist");
    }

    const avatarLocalPath = req.files?.avatar[0]?.path;
    // console.log(avatarLocalPath)
    let coverImageLocalPath;
    if (req.files && Array.isArray(req.files.coverImage) && req.files.coverImage.length > 0) {
        coverImageLocalPath = req.files.coverImage[0].path
    }
    // console.log("working");
    if (!avatarLocalPath) {
        throw new ApiResponse(400, " ", "Avatar file is required")
    }
    // console.log("working1");
    const avatar = await uploadOnCloudinary(avatarLocalPath)
    // console.log(avatar);
    const coverImage = await uploadOnCloudinary(coverImageLocalPath)

    if (!avatar) {
        // throw new ApiError(400, "Avatar file is required")
        new ApiResponse(200, "User registered Successfully")
    }
    const user = await User.create({
        fullName,
        avatar: avatar.url,
        coverImage: coverImage?.url || "",
        email,
        password,
        username: username.toLowerCase()
    })
    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken"
    )

    if (!createdUser) {
        throw new ApiError(500, "Something went wrong while registering the user")
    }
    return res.status(201).json(
        new ApiResponse(200, { user: createdUser }, "User registered Successfully")
    )

})


const Loginuser = asyncHandler(async (req, res, next) => {
    console.log(req.body)
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    console.log(user)
    if (!user) {
        throw new ApiError(404, "Account doesnot exist");
    }

    const checkpassword = await user.isPasswordCorrect(password)
    console.log(checkpassword);
    if (!checkpassword) {
        return res.status(401).json(new ApiResponse(401, " ", "Account doesnot exist"))
    }
    const AccessToken = await user.generateAccessToken();
    const RefreshToken = await user.generateRefreshToken();
    console.log(user)
    //  user.accessToken=AccessToken
    user.refreshToken = RefreshToken;
    //  $2b$10$Nr8nhNAAft4zX/eKFcEbq.AcLwlFsHND8wHq.X1rjPRxVO2CO5X4q
    //$2b$10$GiluqGo9e1qRgAPL/OUWR.BUquIjTw4K8CEqrZQV84EDooXlQBzTm
    console.log(await user.save({ validateBeforeSave: false }))



    const newUser = await User.findOne({ email }).select(" -refreshToken")
    console.log(newUser)
    res.status(200).
        cookie("Acesstoken", AccessToken, {
            httpOnly: true,
            secure: true,
            sameSite: 'None'
        })
        .cookie("Refreshtoken", RefreshToken, {
            httpOnly: true,
            secure: true,
            sameSite: 'None'
        })
        .json(new ApiResponse(200, {
            user: newUser, AccessToken, RefreshToken
        }, "sucesfully Login"))

})

const logoutUser = asyncHandler(async (req, res) => {
    await User.findByIdAndUpdate(
        req.user._id,
        {
            $set: {
                refreshToken: undefined
            }
        },
        {
            new: true
        }
    )


    const options = {
        httpOnly: true,
        secure: true
    }

    return res
        .status(200)
        .clearCookie("Acesstoken", options)
        .clearCookie("Refreshtoken", options)
        .json(new ApiResponse(200, {}, "User logged Out"))
})


const updateProfile = asyncHandler(async (req, res, next) => {
    const { userName, email, fullName } = req.body;
    const user = req.user;
    if (!user) {
        throw new ApiError(400, "No user found");
    }
    const isUser = await User.findOne({ _id: user._id });
    if (!isUser) {
        throw new ApiError(400, "No user exist with email")
    }
    const UpdatedUser = await User.findByIdAndUpdate(
        { _id: user._id },
        {
            username: userName,
            email,
            fullName
        }, { new: true })
    if (!updateProfile) {
        throw new ApiError(401, "Error in Uodating the Data Or Data Does not Match");
    }
    return res.status(200).json(new ApiResponse(200, { user: UpdatedUser }, "user Sucessfully updated"))

    // console.log(UpdatedUser)
})
export { registerUser, Loginuser, logoutUser, updateProfile }
