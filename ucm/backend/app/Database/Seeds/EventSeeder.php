<?php

namespace App\Database\Seeds;

use CodeIgniter\Database\Seeder;

class EventSeeder extends Seeder
{
    public function run()
    {
        //
        $multipleData = [
            [
                'id_club' => 1,
                'name'  => "AI Unleashed 2024: Shaping Tomorrow’s World",
                'description' => "Step into the future with AI Unleashed 2024, a premier event dedicated to exploring the transformative power of artificial intelligence. This event gathers industry leaders, researchers, and AI enthusiasts to delve into groundbreaking innovations, ethical considerations, and real-world applications of AI across diverse sectors. Whether you’re a tech enthusiast, developer, or business leader, this event offers inspiration, knowledge, and networking opportunities.",
                'picture' => "photo-1674027444485-cec3da58eef4.jpg",
                'location'      => "TechVision Convention Center, San Francisco, USA",
                'date'   => "2024-12-18 03:18:00",
            ],
            [
                'id_club' => 2,
                'name'  => "RoboRevolution 2024: Engineering the Future",
                'description' => "Join the robotics community at RoboRevolution 2024, a cutting-edge event celebrating advancements in robotics and automation. This conference brings together engineers, researchers, students, and robotics enthusiasts to showcase innovations, discuss emerging trends, and collaborate on projects shaping the future of automation. From AI-powered robots to industrial automation, this event covers it all.",
                'picture' => "photo-1508175800969-525c72a047dd.webp",
                'location'      => "Innovation Hub, Berlin, Germany",
                'date'   => "2024-12-27 04:20:00",
            ],
            [
                'id_club' => 4,
                'name'  => "ShutterFest 2024: Capturing the World",
                'description' => "Discover the art and science of photography at ShutterFest 2024, a premier event for photographers of all levels. From mastering the basics to exploring advanced techniques, this festival offers workshops, talks, and hands-on experiences designed to inspire creativity and enhance your skills. Whether you’re a professional or a hobbyist, ShutterFest is your gateway to storytelling through the lens.",
                'picture' => "photo-1495808089756-688a7abff51d.webp",
                'location'      => "Art and Lens Pavilion, Florence, Italy",
                'date'   => "2024-12-24 03:20:00",
            ],
            [
                'id_club' => 1,
                'name'  => "AI Frontier 2024: Innovating with Intelligence",
                'description' => "AI Frontier 2024 is the ultimate event for exploring the latest advancements in artificial intelligence and its impact on industries worldwide. This conference brings together AI researchers, technologists, and entrepreneurs to discuss the future of intelligent systems. From machine learning breakthroughs to AI ethics, attendees will gain insights into how AI is transforming business, healthcare, and everyday life.",
                'picture' => "photo-1675557010061-315772f6efef.webp",
                'location'      => "Global Innovation Center, London, UK",
                'date'   => "2024-12-19 03:20:00",
            ],
            [
                'id_club' => 4,
                'name'  => "Visions in Motion 2024: The Art of Photography & Filmmaking",
                'description' => "Immerse yourself in the world of visual storytelling at Visions in Motion 2024, an exciting event celebrating both photography and filmmaking. This gathering of artists, creators, and industry professionals will showcase the latest trends, techniques, and technologies in visual media. Whether you're a photographer, filmmaker, or a fan of creative content, this event offers workshops, exhibitions, and inspiring talks that will fuel your passion for capturing the world.",
                'picture' => "photo-1594394489098-74ac04c0fc2e.webp",
                'location'      => "Creative Arts Center, Los Angeles, USA",
                'date'   => "2025-01-15 03:20:00",
            ],
        ];

        $this->db->table('event')->insertBatch($multipleData);
    }
}
