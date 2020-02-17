-- phpMyAdmin SQL Dump
-- version 4.8.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Mar 17, 2019 at 01:57 PM
-- Server version: 10.1.37-MariaDB
-- PHP Version: 7.3.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `attendance_app`
--

-- --------------------------------------------------------

--
-- Table structure for table `tbl_apply_leave`
--

CREATE TABLE `tbl_apply_leave` (
  `leave_id` int(10) NOT NULL,
  `leave_type` varchar(100) DEFAULT NULL,
  `start_date` varchar(100) DEFAULT NULL,
  `end_date` varchar(100) DEFAULT NULL,
  `in_lieu_date` varchar(100) DEFAULT NULL,
  `comp_off_date` varchar(100) DEFAULT NULL,
  `reason` varchar(100) DEFAULT NULL,
  `leave_desc` varchar(500) DEFAULT NULL,
  `create_date` varchar(100) DEFAULT NULL,
  `modified_date` varchar(100) DEFAULT NULL,
  `is_active` int(10) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tbl_apply_leave`
--

INSERT INTO `tbl_apply_leave` (`leave_id`, `leave_type`, `start_date`, `end_date`, `in_lieu_date`, `comp_off_date`, `reason`, `leave_desc`, `create_date`, `modified_date`, `is_active`) VALUES
(25, 'priviledge_leave', '17/03/2019', '18/03/2019', NULL, NULL, 'Marriage-self', '', NULL, NULL, 1),
(26, 'comp_off', NULL, NULL, '', '', NULL, '', NULL, NULL, 1),
(27, 'priviledge_leave', '11/03/2019', '12/03/2019', NULL, NULL, 'Marriage-self', '', NULL, NULL, 1),
(28, 'comp_off', NULL, NULL, '17/03/2019', '21/03/2019', NULL, '', NULL, NULL, 1),
(29, 'priviledge_leave', '25/03/2019', '26/03/2019', NULL, NULL, 'Personal', '', NULL, NULL, 1),
(30, 'comp_off', NULL, NULL, '30/03/2019', '08/04/2019', NULL, '', NULL, NULL, 1),
(31, 'priviledge_leave', '27/03/2019', '28/03/2019', NULL, NULL, 'Out of Station', 'The Hu ihiuxfohh by', NULL, NULL, 1);

-- --------------------------------------------------------

--
-- Table structure for table `tbl_attendance`
--

CREATE TABLE `tbl_attendance` (
  `attd_id` int(11) NOT NULL,
  `emp_id` int(11) NOT NULL,
  `in_time` datetime NOT NULL,
  `out_time` datetime DEFAULT NULL,
  `is_active` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tbl_attendance`
--

INSERT INTO `tbl_attendance` (`attd_id`, `emp_id`, `in_time`, `out_time`, `is_active`) VALUES
(1, 1901201001, '2019-01-20 18:31:48', '2019-01-21 18:34:41', 1),
(2, 1901201001, '2019-01-21 18:34:29', '2019-01-21 18:39:04', 1),
(3, 1901201001, '2019-01-24 23:00:28', '2019-01-24 23:08:00', 1),
(4, 1901201002, '2019-01-24 23:07:32', '2019-01-24 23:07:45', 1),
(5, 1901201001, '2019-02-15 14:52:48', '2019-02-15 16:17:53', 1),
(6, 1901201002, '2019-02-15 16:17:37', NULL, 1);

-- --------------------------------------------------------

--
-- Table structure for table `tbl_authentication`
--

CREATE TABLE `tbl_authentication` (
  `auth_id` int(100) NOT NULL,
  `auth_username` varchar(100) DEFAULT NULL,
  `auth_password` varchar(100) DEFAULT NULL,
  `is_active` int(10) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tbl_authentication`
--

INSERT INTO `tbl_authentication` (`auth_id`, `auth_username`, `auth_password`, `is_active`) VALUES
(1, 'ravimule', '1234', 1);

-- --------------------------------------------------------

--
-- Table structure for table `tbl_employee`
--

CREATE TABLE `tbl_employee` (
  `emp_id` int(10) NOT NULL,
  `first_name` varchar(100) DEFAULT NULL,
  `last_name` varchar(100) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `password` varchar(50) DEFAULT NULL,
  `dob` date DEFAULT NULL,
  `gender` varchar(10) DEFAULT NULL,
  `profile_picture` varchar(100) DEFAULT NULL,
  `mobile_no` varchar(15) DEFAULT NULL,
  `qualification` varchar(200) DEFAULT NULL,
  `street_address` varchar(100) DEFAULT NULL,
  `city` varchar(100) DEFAULT NULL,
  `state` varchar(100) DEFAULT NULL,
  `country` varchar(100) DEFAULT NULL,
  `pincode` varchar(100) DEFAULT NULL,
  `imei_no` text NOT NULL,
  `create_date` varchar(50) DEFAULT NULL,
  `modify_date` varchar(50) DEFAULT NULL,
  `is_active` int(11) NOT NULL,
  `designation` varchar(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tbl_employee`
--

INSERT INTO `tbl_employee` (`emp_id`, `first_name`, `last_name`, `email`, `password`, `dob`, `gender`, `profile_picture`, `mobile_no`, `qualification`, `street_address`, `city`, `state`, `country`, `pincode`, `imei_no`, `create_date`, `modify_date`, `is_active`, `designation`) VALUES
(1901201001, 'Test', 'Test', 'abc@gmail.com', '123456', '2000-01-20', 'Male', 'IMG_02092019.png', '0123456789', 'BSCIT', 'C/106, GM NX CO-OP Housing Society', 'Virar', 'Maharashtra', 'India', '401308', '865735036723323', '2000-01-20 05:06:00', NULL, 1, NULL),
(1901201002, 'Ravi', 'Mule', 'rmule1996@gmail.com', 'ravi1234', '1996-08-25', 'Male', 'EmpImg.png', '7208132913', 'BSCIT', 'seepz,andheri', 'mumbai', 'Maharashtra', 'India', '400093', '865735036723331', '2000-01-24 23:06:00', '2019-03-13 22:35:21', 1, 'Software Engineer');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_events`
--

CREATE TABLE `tbl_events` (
  `event_id` int(10) NOT NULL,
  `title` varchar(100) DEFAULT NULL,
  `body` varchar(100) DEFAULT NULL,
  `image` varchar(100) DEFAULT NULL,
  `create_date` varchar(100) DEFAULT NULL,
  `modified_date` varchar(100) DEFAULT NULL,
  `is_active` int(10) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `tbl_holiday`
--

CREATE TABLE `tbl_holiday` (
  `holiday_id` int(10) NOT NULL,
  `date` date DEFAULT NULL,
  `holiday_name` varchar(500) DEFAULT NULL,
  `location` varchar(100) NOT NULL,
  `year` year(4) NOT NULL,
  `image` varchar(100) DEFAULT NULL,
  `create_date` varchar(100) DEFAULT NULL,
  `modified_date` varchar(100) DEFAULT NULL,
  `is_active` int(10) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tbl_holiday`
--

INSERT INTO `tbl_holiday` (`holiday_id`, `date`, `holiday_name`, `location`, `year`, `image`, `create_date`, `modified_date`, `is_active`) VALUES
(1, '2019-01-01', 'New Year\'s Day', 'Mumbai', 2019, NULL, NULL, NULL, 1),
(2, '2019-01-26', 'Republic Day', 'Mumbai', 2019, NULL, NULL, NULL, 1),
(3, '2019-03-21', 'Holi/Doljatra', 'Mumbai', 2019, NULL, NULL, NULL, 1),
(4, '2019-05-01', 'International Labor Day', 'Mumbai', 2019, NULL, NULL, NULL, 1),
(5, '2019-06-05', 'Id-ul-Fitr', 'Mumbai', 2019, NULL, NULL, NULL, 1),
(6, '2019-08-15', 'Independence Day', 'Mumbai', 2019, NULL, NULL, NULL, 1),
(7, '2019-09-02', 'Ganesh Chaturthi', 'Mumbai', 2019, NULL, NULL, NULL, 1),
(8, '2019-10-02', 'Gandhi Jayanti', 'Mumbai', 2019, NULL, NULL, NULL, 1),
(9, '2019-10-08', 'Dusshera', 'Mumbai', 2019, NULL, NULL, NULL, 1),
(10, '2019-10-28', 'Diwali', 'Mumbai', 2019, NULL, NULL, NULL, 1),
(11, '2019-12-25', 'Christmas', 'Mumbai', 2019, NULL, NULL, NULL, 1),
(12, '2019-03-13', 'Delhi Holiday', 'Delhi', 2019, NULL, NULL, NULL, 1);

-- --------------------------------------------------------

--
-- Table structure for table `tbl_notices`
--

CREATE TABLE `tbl_notices` (
  `notice_id` int(11) NOT NULL,
  `title` varchar(100) DEFAULT NULL,
  `body` varchar(500) DEFAULT NULL,
  `image` varchar(100) DEFAULT NULL,
  `create_date` varchar(100) DEFAULT NULL,
  `modified_date` varchar(100) DEFAULT NULL,
  `is_active` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tbl_notices`
--

INSERT INTO `tbl_notices` (`notice_id`, `title`, `body`, `image`, `create_date`, `modified_date`, `is_active`) VALUES
(1, 'Apply for International Exchange Programs', 'This program is related to the post graduate students. ', 'http://192.168.43.247:8080/attendance/images/notices/IMG_02092019.png', '2019-02-09', NULL, 1),
(2, 'H.S.C. Board Practical / Oral Exam Time Table', 'This program is related to the HIgher Secondary students. ', '', '2019-02-07', NULL, 1);

-- --------------------------------------------------------

--
-- Table structure for table `tbl_paysleep`
--

CREATE TABLE `tbl_paysleep` (
  `paysleep_id` int(10) NOT NULL,
  `year` varchar(100) NOT NULL,
  `month` varchar(100) NOT NULL,
  `paysleep` varchar(500) NOT NULL,
  `create_date` varchar(100) NOT NULL,
  `modified_date` varchar(100) NOT NULL,
  `is_active` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `tbl_apply_leave`
--
ALTER TABLE `tbl_apply_leave`
  ADD PRIMARY KEY (`leave_id`);

--
-- Indexes for table `tbl_attendance`
--
ALTER TABLE `tbl_attendance`
  ADD PRIMARY KEY (`attd_id`);

--
-- Indexes for table `tbl_authentication`
--
ALTER TABLE `tbl_authentication`
  ADD PRIMARY KEY (`auth_id`);

--
-- Indexes for table `tbl_employee`
--
ALTER TABLE `tbl_employee`
  ADD PRIMARY KEY (`emp_id`);

--
-- Indexes for table `tbl_events`
--
ALTER TABLE `tbl_events`
  ADD PRIMARY KEY (`event_id`);

--
-- Indexes for table `tbl_holiday`
--
ALTER TABLE `tbl_holiday`
  ADD PRIMARY KEY (`holiday_id`);

--
-- Indexes for table `tbl_notices`
--
ALTER TABLE `tbl_notices`
  ADD PRIMARY KEY (`notice_id`);

--
-- Indexes for table `tbl_paysleep`
--
ALTER TABLE `tbl_paysleep`
  ADD PRIMARY KEY (`paysleep_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `tbl_apply_leave`
--
ALTER TABLE `tbl_apply_leave`
  MODIFY `leave_id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=32;

--
-- AUTO_INCREMENT for table `tbl_attendance`
--
ALTER TABLE `tbl_attendance`
  MODIFY `attd_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `tbl_authentication`
--
ALTER TABLE `tbl_authentication`
  MODIFY `auth_id` int(100) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `tbl_events`
--
ALTER TABLE `tbl_events`
  MODIFY `event_id` int(10) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `tbl_holiday`
--
ALTER TABLE `tbl_holiday`
  MODIFY `holiday_id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `tbl_notices`
--
ALTER TABLE `tbl_notices`
  MODIFY `notice_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `tbl_paysleep`
--
ALTER TABLE `tbl_paysleep`
  MODIFY `paysleep_id` int(10) NOT NULL AUTO_INCREMENT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
