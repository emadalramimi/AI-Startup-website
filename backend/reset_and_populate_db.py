import os
import django

# Set up Django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')
django.setup()

from team.models import TeamMember
from services.models import Service
from case_studies.models import CaseStudy
from django.db import connection

def reset_and_populate_db():
    print("Starting database reset and population...")
    
    # Clear existing data
    print("Clearing existing data...")
    TeamMember.objects.all().delete()
    Service.objects.all().delete()
    CaseStudy.objects.all().delete()

    # Add Team Members
    print("Adding team members...")
    team_members = [
        {
            'name': 'Dr. Sarah Chen',
            'role': 'Chief AI Scientist',
            'bio': 'Ph.D. in Computer Science from Stanford University, specializing in deep learning and natural language processing. Led multiple successful AI projects at Google Brain before joining our team.',
            'image': 'team/sarah_chen.jpg',
            'linkedin': 'https://linkedin.com/in/sarah-chen-ai',
            'github': 'https://github.com/sarahchen-ai',
            'twitter': 'https://twitter.com/sarahchen_ai',
            'order': 1
        },
        {
            'name': 'Alex Rodriguez',
            'role': 'Computer Vision Lead',
            'bio': 'Former Computer Vision researcher at OpenAI with expertise in real-time object detection and tracking. Published multiple papers in top CV conferences.',
            'image': 'team/alex_rodriguez.jpg',
            'linkedin': 'https://linkedin.com/in/alex-rodriguez-cv',
            'github': 'https://github.com/alexr-cv',
            'twitter': 'https://twitter.com/alexr_cv',
            'order': 2
        },
        {
            'name': 'Emma Watson',
            'role': 'AI Product Manager',
            'bio': 'Experienced product manager with a background in AI product development at Microsoft. Specializes in bringing AI solutions from research to production.',
            'image': 'team/emma_watson.jpg',
            'linkedin': 'https://linkedin.com/in/emma-watson-ai',
            'github': 'https://github.com/emmaw-product',
            'twitter': 'https://twitter.com/emmaw_ai',
            'order': 3
        },
        {
            'name': 'David Kim',
            'role': 'ML Infrastructure Lead',
            'bio': 'Former ML Infrastructure Engineer at Netflix. Expert in building scalable ML systems and optimizing model deployment pipelines.',
            'image': 'team/david_kim.jpg',
            'linkedin': 'https://linkedin.com/in/david-kim-ml',
            'github': 'https://github.com/davidkim-ml',
            'twitter': 'https://twitter.com/davidkim_ml',
            'order': 4
        },
        {
            'name': 'Maria Garcia',
            'role': 'AI Ethics Researcher',
            'bio': 'Ph.D. in AI Ethics from MIT. Ensures our AI solutions are ethical, unbiased, and socially responsible.',
            'image': 'team/maria_garcia.jpg',
            'linkedin': 'https://linkedin.com/in/maria-garcia-ethics',
            'github': 'https://github.com/mariagarcia-ethics',
            'twitter': 'https://twitter.com/mariagarcia_ai',
            'order': 5
        }
    ]

    for member in team_members:
        try:
            tm = TeamMember.objects.create(**member)
            print(f"Created team member: {tm.name} (ID: {tm.id})")
        except Exception as e:
            print(f"Error creating team member {member['name']}: {str(e)}")

    # Add Services
    print("Adding services...")
    services = [
        {
            'name': 'Custom AI Assistants',
            'slug': 'custom-ai-assistants',
            'description': 'Develop tailored AI assistants for your specific business needs. Our solutions integrate advanced NLP, contextual understanding, and domain-specific knowledge to create intelligent assistants that truly understand your business.',
            'icon': 'smart_toy',
            'order': 1
        },
        {
            'name': 'Computer Vision Solutions',
            'slug': 'computer-vision-solutions',
            'description': 'State-of-the-art computer vision solutions for object detection, tracking, and scene understanding. Perfect for automation, quality control, and security applications.',
            'icon': 'visibility',
            'order': 2
        },
        {
            'name': 'AI Research & Development',
            'slug': 'ai-research-development',
            'description': 'Cutting-edge R&D services in artificial intelligence, focusing on novel algorithms, model optimization, and pushing the boundaries of what is possible with AI.',
            'icon': 'science',
            'order': 3
        },
        {
            'name': 'AI Integration & Deployment',
            'slug': 'ai-integration-deployment',
            'description': 'Expert services in integrating and deploying AI solutions in production environments, ensuring scalability, reliability, and optimal performance.',
            'icon': 'rocket_launch',
            'order': 4
        },
        {
            'name': 'AI Model Training & Optimization',
            'slug': 'ai-model-training',
            'description': 'Specialized services in training and optimizing AI models for your specific use case, ensuring maximum accuracy and efficiency.',
            'icon': 'psychology',
            'order': 5
        },
        {
            'name': 'AI Ethics & Compliance',
            'slug': 'ai-ethics-compliance',
            'description': 'Comprehensive services ensuring your AI solutions are ethical, unbiased, and compliant with relevant regulations and standards.',
            'icon': 'balance',
            'order': 6
        }
    ]

    for service in services:
        try:
            s = Service.objects.create(**service)
            print(f"Created service: {s.name} (ID: {s.id})")
        except Exception as e:
            print(f"Error creating service {service['name']}: {str(e)}")

    # Add Case Studies
    print("Adding case studies...")
    case_studies = [
        {
            'title': 'AI Assistant for Healthcare',
            'slug': 'ai-assistant-healthcare',
            'description': 'Developed a specialized AI assistant for a major healthcare provider, improving patient care coordination and reducing administrative workload by 60%.',
            'challenge': 'The healthcare provider needed an AI solution to handle patient inquiries, schedule appointments, and provide basic medical information while maintaining strict HIPAA compliance.',
            'solution': 'We created a custom AI assistant using our proprietary NLP engine, integrated with the hospital\'s EMR system, and implemented advanced security measures.',
            'results': 'Reduced wait times by 45%, improved patient satisfaction scores by 35%, and saved over 1000 staff hours per month.',
            'image': 'case_studies/healthcare_ai.jpg',
            'technologies': ['NLP', 'BERT', 'Python', 'TensorFlow', 'HIPAA Compliance'],
            'order': 1
        },
        {
            'title': 'Industrial Quality Control CV System',
            'slug': 'industrial-qc-cv',
            'description': 'Implemented an advanced computer vision system for real-time quality control in manufacturing, achieving 99.9% defect detection accuracy.',
            'challenge': 'A manufacturing company needed to automate their quality control process to detect microscopic defects in high-speed production lines.',
            'solution': 'Developed a custom CV solution using deep learning models optimized for real-time processing, integrated with existing production systems.',
            'results': 'Reduced defect escape rate by 98%, increased production speed by 25%, and achieved ROI within 6 months.',
            'image': 'case_studies/industrial_cv.jpg',
            'technologies': ['Computer Vision', 'PyTorch', 'CUDA', 'Real-time Processing'],
            'order': 2
        },
        {
            'title': 'Retail Analytics AI Platform',
            'slug': 'retail-analytics-ai',
            'description': 'Created an AI-powered retail analytics platform combining computer vision and predictive analytics for optimal store operations.',
            'challenge': 'A major retail chain needed to optimize store layouts, inventory management, and staffing based on customer behavior and sales patterns.',
            'solution': 'Implemented a comprehensive AI platform that uses computer vision for customer tracking and machine learning for predictive analytics.',
            'results': 'Increased sales by 23%, reduced inventory costs by 15%, and improved staff utilization by 30%.',
            'image': 'case_studies/retail_analytics.jpg',
            'technologies': ['Computer Vision', 'Machine Learning', 'Python', 'TensorFlow', 'React'],
            'order': 3
        },
        {
            'title': 'Financial Fraud Detection System',
            'slug': 'financial-fraud-detection',
            'description': 'Developed an AI-powered fraud detection system for a leading financial institution.',
            'challenge': 'The bank needed a real-time system to detect and prevent fraudulent transactions while minimizing false positives.',
            'solution': 'Created a sophisticated ML model that analyzes transaction patterns and user behavior in real-time.',
            'results': 'Reduced fraud losses by 75% while decreasing false positive rates by 50%.',
            'image': 'case_studies/fraud_detection.jpg',
            'technologies': ['Machine Learning', 'Real-time Processing', 'Python', 'Apache Spark'],
            'order': 4
        },
        {
            'title': 'Autonomous Drone Navigation',
            'slug': 'autonomous-drone-navigation',
            'description': 'Built an AI system for autonomous drone navigation in complex urban environments.',
            'challenge': 'A logistics company needed drones that could navigate safely through cities while avoiding obstacles and following optimal routes.',
            'solution': 'Developed a computer vision and deep learning system for real-time obstacle detection and path planning.',
            'results': 'Achieved 99.99% safe flight rate and reduced delivery times by 40%.',
            'image': 'case_studies/drone_navigation.jpg',
            'technologies': ['Computer Vision', 'Deep Learning', 'ROS', 'Python', 'C++'],
            'order': 5
        }
    ]

    for case_study in case_studies:
        try:
            cs = CaseStudy.objects.create(**case_study)
            print(f"Created case study: {cs.title} (ID: {cs.id})")
        except Exception as e:
            print(f"Error creating case study {case_study['title']}: {str(e)}")

    print("\nDatabase reset and populated successfully!")

if __name__ == "__main__":
    reset_and_populate_db()
