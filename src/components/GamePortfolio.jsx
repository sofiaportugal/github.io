import { Canvas } from '@react-three/fiber';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import PlayerControls from './PlayerControls';
import ProjectPanel from './ProjectPanel';

const GamePortfolio = () => {
    const [projects, setProjects] = useState([]);
    const [easterEggVisible, setEasterEggVisible] = useState(false);

    useEffect(() => {
        // Fetch projects data from an API or local JSON file
        const fetchProjects = async () => {
            const response = await fetch('/path-to-project-data');
            const data = await response.json();
            setProjects(data);
        };
        fetchProjects();
    }, []);

    // Function to handle keyboard events for player controls
    const handleKeyDown = (e) => {
        // WASD and Arrow Keys controls
        // Implement player movement logic here
        if (e.key === 'e') {
            setEasterEggVisible(true);
        }
    };

    return (
        <Canvas tabIndex={0} onKeyDown={handleKeyDown} style={{ height: '100vh' }}>
            <ambientLight />
            <pointLight position={[10, 10, 10]} />
            <PlayerControls />
            {projects.map((project, index) => (
                <motion.group
                    key={index}
                    whileHover={{ scale: 1.1 }}
                    onClick={() => toggleProjectPanel(project)}
                >
                    <ProjectPanel project={project} />
                </motion.group>
            ))}
            {easterEggVisible && <div className="easter-egg">🎉 Easter Egg Found!</div>}
        </Canvas>
    );
};

export default GamePortfolio;