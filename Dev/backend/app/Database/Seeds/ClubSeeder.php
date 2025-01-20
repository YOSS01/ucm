<?php

namespace App\Database\Seeds;

use CodeIgniter\Database\Seeder;

class ClubSeeder extends Seeder
{
    public function run()
    {
        //
        $multipleData = [
            [
                'id_president' => 1,
                'email' => 'aiinnovators@techclub.org',
                'name' => 'AI Innovators Hub',
                'description'  => 'The AI Innovators Hub is a community of tech enthusiasts, researchers, and students passionate about artificial intelligence and its transformative potential. This club is dedicated to exploring AI technologies, building practical projects, and fostering collaboration among members. From machine learning and natural language processing to robotics and ethical AI, the club offers opportunities for learning, innovation, and networking.',
                'logo' => 'Oxford_University_Exploration_Club_Logo_1.png',
                'background' => 'photo-1507146153580-69a1fe6d8aa1.webp',
                'status'      => 'approved',
                'slug'      => 'ai-innovators-hub',
            ],
            [
                'id_president' => 3,
                'email' => 'robotech@innovationclub.org',
                'name' => 'RoboTech Alliance',
                'description'  => 'The RoboTech Alliance is a community for robotics enthusiasts eager to explore, build, and innovate in the field of robotics. This club is a hub for students, engineers, and hobbyists who are passionate about designing robots, learning advanced robotics concepts, and tackling real-world challenges through automation. Whether you’re a beginner or an experienced builder, the RoboTech Alliance offers hands-on opportunities to bring your ideas to life.',
                'logo' => 'robotics_logo.png',
                'background' => 'photo-1590401043335-2c0c4bc19eb5.webp',
                'status'      => 'pending',
                'slug'      => 'robotech-alliance',
            ],
            [
                'id_president' => 4,
                'email' => 'contact@peakperformanceclub.org',
                'name' => 'Peak Performance Club',
                'description'  => "The Peak Performance Club is a vibrant sports community that promotes physical fitness, teamwork, and a love for athletic challenges. Open to individuals of all skill levels, the club offers a variety of sports and fitness activities, fostering an environment of camaraderie and mutual growth. Whether you’re into competitive sports or casual games, this club provides opportunities to stay active, improve your skills, and connect with like-minded people.",
                'logo' => 'm84fp5v-removebg-preview.png',
                'background' => 'photo-1430232324554-8f4aebd06683.webp',
                'status'      => 'approved',
                'slug'      => 'peak-performance-club',
            ],
            [
                'id_president' => 2,
                'email' => 'framefocus@creativeclub.org',
                'name' => 'Photography & Film Club',
                'description'  => "The Frame & Focus Collective is a creative community for photography and filmmaking enthusiasts who are passionate about visual storytelling. Whether you're an aspiring photographer, a budding filmmaker, or a seasoned professional, this club offers a platform to learn, create, and showcase your work. With hands-on workshops, collaborative projects, and regular showcases, members will have countless opportunities to refine their craft and share their vision with others.",
                'logo' => 'photography_logo.png',
                'background' => 'photo-1647855169746-aa316eae7f46.webp',
                'status'      => 'pending',
                'slug'      => 'photography-film-club',
            ],
        ];

        $membershipData = [
            [
                'id_club' => 1,
                'id_user' => 1,
                'role' => "president",
                'join_date'  => "2024-12-04 23:10:30",
                'status' => "approved"
            ],
            [
                'id_club' => 2,
                'id_user' => 3,
                'role' => "president",
                'join_date'  => "2024-12-04 23:11:34",
                'status' => "approved"
            ],
            [
                'id_club' => 3,
                'id_user' => 4,
                'role' => "president",
                'join_date'  => "2024-12-04 23:12:48",
                'status' => "approved"
            ],
            [
                'id_club' => 4,
                'id_user' => 2,
                'role' => "president",
                'join_date'  => "2024-12-04 23:14:29",
                'status' => "approved"
            ],
        ];

        $this->db->table('clubs')->insertBatch($multipleData);
        $this->db->table('clubmembership')->insertBatch($membershipData);
    }
}
