-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Oct 30, 2024 at 01:09 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `club_managment`
--

-- --------------------------------------------------------

--
-- Table structure for table `admin`
--

CREATE TABLE `admin` (
  `id` int(11) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `admin`
--

INSERT INTO `admin` (`id`, `email`, `password`) VALUES
(1, 'admin@admin.com', 'adminadmin');

-- --------------------------------------------------------

--
-- Table structure for table `clubmembership`
--

CREATE TABLE `clubmembership` (
  `id` int(11) NOT NULL,
  `id_club` int(9) NOT NULL,
  `id_user` int(9) NOT NULL,
  `role` varchar(255) NOT NULL,
  `join_date` date NOT NULL,
  `status` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `clubmembership`
--

INSERT INTO `clubmembership` (`id`, `id_club`, `id_user`, `role`, `join_date`, `status`) VALUES
(1, 12, 76, 'fgsyfdytdjhfjhf', '2024-10-09', 'jgiug'),
(2, 12, 76, 'fgsyfdytdjhfjhf', '2024-10-09', 'jgiug');

-- --------------------------------------------------------

--
-- Table structure for table `clubs`
--

CREATE TABLE `clubs` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` text DEFAULT NULL,
  `logo` varchar(255) DEFAULT NULL,
  `background` varchar(255) DEFAULT NULL,
  `qr_code` varchar(255) DEFAULT NULL,
  `status` varchar(50) DEFAULT NULL,
  `id_president` int(4) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `clubs`
--

INSERT INTO `clubs` (`id`, `name`, `description`, `logo`, `background`, `qr_code`, `status`, `id_president`) VALUES
(1, 'TestClub', 'description.', 'test_logo.png', 'test_background.png', 'test_qr_code.png', 'active', 0),
(2, 'TestClub', 'description.', 'test_logo.png', 'test_background.png', 'test_qr_code.png', 'active', 0),
(3, 'TestClub', 'description.', 'test_logo.png', 'test_background.png', 'test_qr_code.png', 'active', 0),
(4, 'TestClub', 'description.', 'test_logo.png', 'test_background.png', 'test_qr_code.png', 'active', NULL),
(7, 'ksdf', 'kjezhfijkzdhfk', 'cappuccino.png', 'espresso.png', 'espresso_1.png', 'active', 2),
(8, 'ksdf', 'kjezhfijkzdhfk', 'cappuccino_1.png', 'espresso_2.png', 'espresso_3.png', 'active', 2);

-- --------------------------------------------------------

--
-- Table structure for table `event`
--

CREATE TABLE `event` (
  `id` int(11) NOT NULL,
  `id_club` int(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` varchar(255) NOT NULL,
  `location` varchar(255) NOT NULL,
  `date` date NOT NULL,
  `picture` varchar(255) NOT NULL,
  `background` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `event`
--

INSERT INTO `event` (`id`, `id_club`, `name`, `description`, `location`, `date`, `picture`, `background`) VALUES
(1, 2, 'jhk', 'fk,f', 'jd.pnf', '0000-00-00', 'hjk', 'hkb'),
(2, 2, 'jhk', 'fk,f', 'jd.pnf', '0000-00-00', 'hjk', 'hkb'),
(3, 3, 'Sample Location', 'This is a sample event for testing purposes.', 'Sample Location', '0000-00-00', 'oajn.png', 'usu.png');

-- --------------------------------------------------------

--
-- Table structure for table `eventrequest`
--

CREATE TABLE `eventrequest` (
  `id` int(11) NOT NULL,
  `id_club` int(11) NOT NULL,
  `id_visitor` int(11) NOT NULL,
  `id_event` int(11) NOT NULL,
  `status` varchar(50) NOT NULL,
  `request_date` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `eventrequest`
--

INSERT INTO `eventrequest` (`id`, `id_club`, `id_visitor`, `id_event`, `status`, `request_date`) VALUES
(1, 1, 101, 50, 'pending', '2024-10-19 16:46:45'),
(2, 1, 101, 50, 'pending', '2024-10-19 17:25:12');

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `id` int(11) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `first_name` varchar(100) NOT NULL,
  `last_name` varchar(100) NOT NULL,
  `cin` varchar(50) NOT NULL,
  `picture` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id`, `email`, `password`, `first_name`, `last_name`, `cin`, `picture`) VALUES
(1, 'test@hdbj.com', '$2y$10$5H6VqFh4DU.iEfGre7SfX.NdtbOSfuDZ4Z4QBmu6Wkx0NjCx.wEKO', 'John', 'Doe', 'C123456', 'path/to/picture.jpg'),
(2, 'teaast@hdbj.com', '$2y$10$4/V/qyE0V4mlT.YRFSwbmOGBQQTG06yxvIARjT28c4vVP7nXvjUnK', 'John', 'Doe', 'C123456', 'path/to/picture.jpg'),
(4, 'teetsts@gmail.com', '$2y$10$o67h.HUxFdmPzWILW0fpku4Q8UTygoe8Bwtbd8frq6XRfdjb4sqqq', 'nkjfdnkjn', 'nkfjkj', '276h', 'ayoub.jdj'),
(15, 'jhbjhb@hdbj.com', '$2y$10$9OXTKt1NYk7F80SyfBxgveh2XXpB5SYWDhJnWmQQ3f/mRi2Kw6h2.', 'John', 'Doe', 'C123456', 'path/to/picture.jpg'),
(16, 'dnfkdjsnf@hdbj.com', '$2y$10$4cenw.2aBxPaX.7sKOw95uj.OVk/CJf4mzAnP66QjCsZzhXle0lOq', 'John', 'Doe', 'C123456', 'path/to/picture.jpg'),
(17, 'john@example.com', '$2y$10$wo9cg4uxfVk2JAldGn8bk.mvRj05KVJ0nC9l.ECQSLGQCAx9g.kTy', 'John', 'Doe', '12345678', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `visitors`
--

CREATE TABLE `visitors` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `visitors`
--

INSERT INTO `visitors` (`id`, `name`, `email`, `created_at`) VALUES
(1, 'useme', 'raz@fndjf.vom', '2024-10-20 22:45:27'),
(2, 'useme', 'raz@fndjf.vom', '2024-10-20 22:47:36'),
(3, 'useme', 'raz@fndjf.vom', '2024-10-20 22:49:04'),
(4, 'useme', 'raz@fndjf.vom', '2024-10-20 22:49:36'),
(5, 'useme', 'raz@fndjf.vom', '2024-10-21 10:33:36');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admin`
--
ALTER TABLE `admin`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `clubmembership`
--
ALTER TABLE `clubmembership`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `clubs`
--
ALTER TABLE `clubs`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `event`
--
ALTER TABLE `event`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `eventrequest`
--
ALTER TABLE `eventrequest`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indexes for table `visitors`
--
ALTER TABLE `visitors`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `admin`
--
ALTER TABLE `admin`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `clubmembership`
--
ALTER TABLE `clubmembership`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `clubs`
--
ALTER TABLE `clubs`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `event`
--
ALTER TABLE `event`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `eventrequest`
--
ALTER TABLE `eventrequest`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT for table `visitors`
--
ALTER TABLE `visitors`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
