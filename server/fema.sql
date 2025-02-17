-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Apr 18, 2024 at 07:55 PM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `fema`
--

-- --------------------------------------------------------

--
-- Table structure for table `disasters`
--

CREATE TABLE `disasters` (
  `id` int(11) NOT NULL,
  `type` varchar(32) NOT NULL,
  `city` varchar(32) NOT NULL,
  `picture` varchar(128) NOT NULL DEFAULT 'placeholder.jpeg'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `disasters`
--

INSERT INTO `disasters` (`id`, `type`, `city`, `picture`) VALUES
(1, 'Dust Storm', 'Phoenix', 'PhoenixDustStorm.png'),
(2, 'Monsters Vs. Aliens', 'San Fransico', 'MonstersVersusAliens.jpeg'),
(130, 'War', 'New York', 'ai.jpeg'),
(131, 'Celestial Event', 'Arrakeen', 'eclipse.jpeg'),
(132, 'Monster Attack', 'Tokyo', 'godzilla.jpeg'),
(133, 'Holy War', 'Caladan', 'holy-war.webp');

-- --------------------------------------------------------

--
-- Table structure for table `needs`
--

CREATE TABLE `needs` (
  `id` int(11) NOT NULL,
  `name` varchar(32) NOT NULL DEFAULT 'Volunteers',
  `disaster_id` int(11) NOT NULL DEFAULT 1,
  `quantity_filled` int(11) NOT NULL DEFAULT 0,
  `quantity_max` int(11) NOT NULL DEFAULT 100,
  `warehouse` varchar(32) NOT NULL DEFAULT 'Phoenix',
  `status` enum('in_warehouse','in_transit','delivered') NOT NULL DEFAULT 'in_warehouse'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `needs`
--

INSERT INTO `needs` (`id`, `name`, `disaster_id`, `quantity_filled`, `quantity_max`, `warehouse`, `status`) VALUES
(1, 'Volunteers', 1, 500, 500, '', 'in_warehouse'),
(2, 'Hats', 1, 1000, 1000, '', 'in_warehouse'),
(3, 'Gloves', 1, 250, 250, '', 'in_warehouse'),
(4, 'Volunteers', 2, 500, 500, '', 'in_warehouse'),
(5, 'Sweaters', 2, 1000, 1000, '', 'in_transit'),
(6, 'Bandages', 2, 250, 250, '', 'delivered'),
(33, 'Robots', 130, 0, 50000, 'Phoenix', 'in_warehouse'),
(34, 'GPTs', 130, 0, 42, 'Phoenix', 'in_warehouse'),
(35, 'Jedi', 130, 0, 1337, 'Phoenix', 'in_warehouse'),
(36, 'Elon Musk', 130, 0, 1, 'Phoenix', 'in_warehouse'),
(37, 'Bill Gates', 130, 0, 1, 'Phoenix', 'in_warehouse'),
(38, 'Glasses', 131, 0, 400, 'Phoenix', 'in_warehouse'),
(39, 'Cameras', 131, 0, 3, 'Phoenix', 'in_warehouse'),
(40, 'Dust Filters', 131, 0, 500, 'Phoenix', 'in_warehouse'),
(41, 'Doctors', 132, 0, 5000, 'Phoenix', 'in_warehouse'),
(42, 'Guns', 132, 0, 100, 'Phoenix', 'in_warehouse'),
(43, 'Nuclear Warheads', 132, 0, 400, 'Phoenix', 'in_warehouse'),
(44, 'Volunteers', 132, 0, 900, 'Phoenix', 'in_warehouse'),
(45, 'World Leaders', 132, 0, 2, 'Phoenix', 'in_warehouse'),
(46, 'Stillsuits', 133, 0, 1000000, 'Phoenix', 'in_warehouse'),
(47, 'Troops', 133, 0, 1000000, 'Phoenix', 'in_warehouse'),
(48, 'Spice Bags', 133, 0, 1000000, 'Phoenix', 'in_warehouse'),
(49, 'Swords', 133, 0, 1000000, 'Phoenix', 'in_warehouse'),
(50, 'Shields', 133, 0, 1000000, 'Phoenix', 'in_warehouse'),
(51, 'Christopher Walken', 133, 0, 1, 'Phoenix', 'in_warehouse');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` varchar(128) NOT NULL,
  `email` varchar(32) NOT NULL,
  `password` varchar(32) NOT NULL,
  `type` varchar(32) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `password`, `type`) VALUES
(2, 'Hayden Baldwin', 'haydenb@andrews.edu', 'password', 'Doctor');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `disasters`
--
ALTER TABLE `disasters`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `needs`
--
ALTER TABLE `needs`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `disasters`
--
ALTER TABLE `disasters`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=134;

--
-- AUTO_INCREMENT for table `needs`
--
ALTER TABLE `needs`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=52;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
