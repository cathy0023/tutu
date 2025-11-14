import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
type VenusFlytrapStage = "waiting" | "catching" | "digesting";

export default function Home() {
    const [activeStage, setActiveStage] = useState<VenusFlytrapStage>("waiting");
    const [isDragging, setIsDragging] = useState(false);

    const [flyPosition, setFlyPosition] = useState({
        x: 100,
        y: 100
    });

    const [isLeafClosed, setIsLeafClosed] = useState(false);
    const flyRef = useRef<HTMLDivElement>(null);
    const leafRef = useRef<HTMLDivElement>(null);

    const handleMouseDown = () => {
        setIsDragging(true);
    };

    const handleTouchStart = (e: React.TouchEvent) => {
        e.preventDefault(); // 防止默认滚动行为
        setIsDragging(true);
    };

    const updatePosition = (clientX: number, clientY: number) => {
        const gameArea = document.getElementById("game-area");

        if (!gameArea)
            return;

        const rect = gameArea.getBoundingClientRect();

        setFlyPosition({
            x: clientX - rect.left - 20,
            y: clientY - rect.top - 20
        });
    };

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!isDragging)
            return;
        updatePosition(e.clientX, e.clientY);
    };

    const handleTouchMove = (e: React.TouchEvent) => {
        e.preventDefault(); // 防止默认滚动行为
        if (!isDragging)
            return;
        if (e.touches.length > 0) {
            const touch = e.touches[0];
            updatePosition(touch.clientX, touch.clientY);
        }
    };

    const handleMouseUp = () => {
        if (!isDragging)
            return;

        if (flyRef.current && leafRef.current) {
            const flyRect = flyRef.current.getBoundingClientRect();
            const leafRect = leafRef.current.getBoundingClientRect();

            if (flyRect.left < leafRect.right && flyRect.right > leafRect.left && flyRect.top < leafRect.bottom && flyRect.bottom > leafRect.top) {
                setIsLeafClosed(true);

                setTimeout(() => {
                    setActiveStage("digesting");
                }, 2000);
            }
        }

        setIsDragging(false);
    };

    const handleTouchEnd = (e: React.TouchEvent) => {
        e.preventDefault();
        handleMouseUp();
    };

    const goToNextStage = () => {
        if (activeStage === "waiting") {
            setActiveStage("catching");
        } else if (activeStage === "catching") {
            setActiveStage("digesting");
        } else {
            setActiveStage("waiting");
            setIsLeafClosed(false);
        }
    };

    const handleInteractiveClick = (type: string) => {
        if (type === "fly") {
            if (activeStage === "waiting") {
                setActiveStage("catching");
            }
        } else if (type === "droplet")
            {}
    };

    return (
        <div
            className="min-h-screen bg-gradient-to-b from-green-100 to-blue-100 p-4 md:p-8 font-sans">
            {}
            <motion.div
                initial={{
                    y: -50,
                    opacity: 0
                }}
                animate={{
                    y: 0,
                    opacity: 1
                }}
                className="text-center mb-8">
                <h1 className="text-3xl md:text-5xl font-bold text-green-700 mb-2">捕蝇草的奇妙世界</h1>
                <p className="text-lg md:text-xl text-green-600">和小朋友一起探索捕蝇草的秘密吧！</p>
            </motion.div>
            {}
            <div className="max-w-6xl mx-auto mb-12">
                <div className="flex flex-col md:flex-row gap-4 md:gap-8">
                    {}
                    <motion.div
                        className={`relative flex-1 rounded-xl overflow-hidden shadow-lg cursor-pointer transition-transform ${activeStage === "waiting" ? "ring-4 ring-yellow-400 scale-105" : "opacity-70"}`}
                        whileHover={{
                            scale: 1.03
                        }}
                        onClick={() => setActiveStage("waiting")}>
                        <div className="bg-green-200 h-64 md:h-80 relative overflow-hidden">
                            {}
                            <motion.div
                                className="absolute inset-0 flex items-center justify-center"
                                initial={{
                                    scale: 0.9
                                }}
                                animate={{
                                    scale: [0.9, 1, 0.9]
                                }}
                                transition={{
                                    repeat: Infinity,
                                    duration: 5,
                                    ease: "easeInOut"
                                }}>
                                <svg
                                    width="100%"
                                    height="100%"
                                    viewBox="0 0 200 200"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <g>
                                        {}
                                        <path d="M10,180 Q50,120 90,180" stroke="#4ade80" strokeWidth="8" fill="none" />
                                        <path d="M30,180 Q70,140 110,180" stroke="#4ade80" strokeWidth="8" fill="none" />
                                        <path
                                            d="M130,180 Q170,130 190,180"
                                            stroke="#4ade80"
                                            strokeWidth="8"
                                            fill="none" />
                                        <path
                                            d="M150,180 Q180,150 170,180"
                                            stroke="#4ade80"
                                            strokeWidth="6"
                                            fill="none" />
                                        {}
                                        <path d="M100,180 L100,120" stroke="#22c55e" strokeWidth="10" fill="none" />
                                        {}
                                        <path
                                            d="M100,120 Q70,100 80,70"
                                            stroke="#facc15"
                                            strokeWidth="2"
                                            fill="#fef08a" />
                                        <path
                                            d="M100,120 Q130,100 120,70"
                                            stroke="#facc15"
                                            strokeWidth="2"
                                            fill="#fef08a" />
                                        {}
                                        {[...Array(8)].map((_, i) => <path
                                            key={`tooth-left-${i}`}
                                            d={`M${80 + i * 5},${70 + i * 2} L${75 + i * 5},${65 + i * 2}`}
                                            stroke="#ef4444"
                                            strokeWidth="2"
                                            fill="none" />)}
                                        {[...Array(8)].map((_, i) => <path
                                            key={`tooth-right-${i}`}
                                            d={`M${120 - i * 5},${70 + i * 2} L${125 - i * 5},${65 + i * 2}`}
                                            stroke="#ef4444"
                                            strokeWidth="2"
                                            fill="none" />)}
                                    </g>
                                </svg>
                            </motion.div>
                            {}
                            <motion.div
                                className="absolute top-1/4 left-1/4 w-10 h-10 cursor-pointer z-10"
                                initial={{
                                    x: 0,
                                    y: 0
                                }}
                                animate={{
                                    x: [0, 10, -10, 5, -5, 0],
                                    y: [0, -5, 5, -10, 10, 0]
                                }}
                                transition={{
                                    repeat: Infinity,
                                    duration: 8,
                                    ease: "easeInOut"
                                }}
                                onClick={() => handleInteractiveClick("fly")}>
                                <svg
                                    width="100%"
                                    height="100%"
                                    viewBox="0 0 50 50"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <circle cx="25" cy="25" r="10" fill="#1f2937" />
                                    <path
                                        d="M15,25 L5,20 M15,25 L5,30 M35,25 L45,20 M35,25 L45,30"
                                        stroke="#1f2937"
                                        strokeWidth="2"
                                        fill="none" />
                                    <path d="M25,15 Q35,10 40,15" stroke="#1f2937" strokeWidth="2" fill="none" />
                                    <circle cx="20" cy="22" r="2" fill="white" />
                                    <circle cx="30" cy="22" r="2" fill="white" />
                                </svg>
                            </motion.div>
                        </div>
                        <div className="bg-yellow-50 p-4 text-center">
                            <h2 className="text-xl font-bold text-yellow-600">等待阶段</h2>
                            <p className="text-yellow-700">张开口，等呀等</p>
                        </div>
                    </motion.div>
                    {}
                    <motion.div
                        className={`relative flex-1 rounded-xl overflow-hidden shadow-lg cursor-pointer transition-transform ${activeStage === "catching" ? "ring-4 ring-yellow-400 scale-105" : "opacity-70"}`}
                        whileHover={{
                            scale: 1.03
                        }}
                        onClick={() => setActiveStage("catching")}>
                        <div className="bg-green-200 h-64 md:h-80 relative overflow-hidden">
                            {}
                            <motion.div
                                className="absolute inset-0 flex items-center justify-center"
                                animate={{
                                    scale: 1
                                }}>
                                <svg
                                    width="100%"
                                    height="100%"
                                    viewBox="0 0 200 200"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <g>
                                        {}
                                        <path d="M10,180 Q50,120 90,180" stroke="#4ade80" strokeWidth="8" fill="none" />
                                        <path d="M30,180 Q70,140 110,180" stroke="#4ade80" strokeWidth="8" fill="none" />
                                        <path
                                            d="M130,180 Q170,130 190,180"
                                            stroke="#4ade80"
                                            strokeWidth="8"
                                            fill="none" />
                                        <path
                                            d="M150,180 Q180,150 170,180"
                                            stroke="#4ade80"
                                            strokeWidth="6"
                                            fill="none" />
                                        {}
                                        <path d="M100,180 L100,120" stroke="#22c55e" strokeWidth="10" fill="none" />
                                        {}
                                        <AnimatePresence>
                                            {!isLeafClosed ? <motion.g
                                                initial={{
                                                    opacity: 1
                                                }}
                                                animate={{
                                                    opacity: 1
                                                }}
                                                exit={{
                                                    opacity: 0
                                                }}>
                                                <path
                                                    d="M100,120 Q70,100 80,70"
                                                    stroke="#facc15"
                                                    strokeWidth="2"
                                                    fill="#fef08a" />
                                                <path
                                                    d="M100,120 Q130,100 120,70"
                                                    stroke="#facc15"
                                                    strokeWidth="2"
                                                    fill="#fef08a" />
                                                {}
                                                {[...Array(8)].map((_, i) => <path
                                                    key={`tooth-left-${i}`}
                                                    d={`M${80 + i * 5},${70 + i * 2} L${75 + i * 5},${65 + i * 2}`}
                                                    stroke="#ef4444"
                                                    strokeWidth="2"
                                                    fill="none" />)}
                                                {[...Array(8)].map((_, i) => <path
                                                    key={`tooth-right-${i}`}
                                                    d={`M${120 - i * 5},${70 + i * 2} L${125 - i * 5},${65 + i * 2}`}
                                                    stroke="#ef4444"
                                                    strokeWidth="2"
                                                    fill="none" />)}
                                            </motion.g> : <motion.g
                                                initial={{
                                                    opacity: 0
                                                }}
                                                animate={{
                                                    opacity: 1
                                                }}
                                                exit={{
                                                    opacity: 0
                                                }}>
                                                <path
                                                    d="M100,120 Q90,90 100,70 Q110,90 100,120"
                                                    stroke="#facc15"
                                                    strokeWidth="2"
                                                    fill="#fef08a" />
                                                {}
                                                <circle cx="100" cy="95" r="8" fill="#1f2937" opacity="0.7" />
                                                <path
                                                    d="M92,95 L87,92 M92,95 L87,98 M108,95 L113,92 M108,95 L113,98"
                                                    stroke="#1f2937"
                                                    strokeWidth="1.5"
                                                    fill="none"
                                                    opacity="0.7" />
                                            </motion.g>}
                                        </AnimatePresence>
                                    </g>
                                </svg>
                            </motion.div>
                            {}
                            <></>
                        </div>
                        <div className="bg-yellow-50 p-4 text-center">
                            <h2 className="text-xl font-bold text-yellow-600">捕捉阶段</h2>
                            <p className="text-yellow-700">啪！抓住啦</p>
                        </div>
                    </motion.div>
                    {}
                    <motion.div
                        className={`relative flex-1 rounded-xl overflow-hidden shadow-lg cursor-pointer transition-transform ${activeStage === "digesting" ? "ring-4 ring-yellow-400 scale-105" : "opacity-70"}`}
                        whileHover={{
                            scale: 1.03
                        }}
                        onClick={() => setActiveStage("digesting")}>
                        <div className="bg-green-200 h-64 md:h-80 relative overflow-hidden">
                            {}
                            <motion.div
                                className="absolute inset-0 flex items-center justify-center"
                                animate={{
                                    scale: [1, 1.02, 1]
                                }}
                                transition={{
                                    repeat: Infinity,
                                    duration: 4,
                                    ease: "easeInOut"
                                }}>
                                <svg
                                    width="100%"
                                    height="100%"
                                    viewBox="0 0 200 200"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <g>
                                        {}
                                        <path d="M10,180 Q50,120 90,180" stroke="#4ade80" strokeWidth="8" fill="none" />
                                        <path d="M30,180 Q70,140 110,180" stroke="#4ade80" strokeWidth="8" fill="none" />
                                        <path
                                            d="M130,180 Q170,130 190,180"
                                            stroke="#4ade80"
                                            strokeWidth="8"
                                            fill="none" />
                                        <path
                                            d="M150,180 Q180,150 170,180"
                                            stroke="#4ade80"
                                            strokeWidth="6"
                                            fill="none" />
                                        {}
                                        <path d="M100,180 L100,120" stroke="#22c55e" strokeWidth="10" fill="none" />
                                        {}
                                        <path
                                            d="M100,120 Q90,90 100,70 Q110,90 100,120"
                                            stroke="#facc15"
                                            strokeWidth="2"
                                            fill="#fef08a" />
                                        {}
                                        <motion.path
                                            d="M95,100 Q100,90 105,100"
                                            stroke="#ef4444"
                                            strokeWidth="1.5"
                                            strokeDasharray="2,2"
                                            fill="none"
                                            animate={{
                                                pathLength: [0, 1, 0]
                                            }}
                                            transition={{
                                                repeat: Infinity,
                                                duration: 3,
                                                ease: "easeInOut"
                                            }} />
                                        <motion.path
                                            d="M92,105 Q100,95 108,105"
                                            stroke="#ef4444"
                                            strokeWidth="1.5"
                                            strokeDasharray="2,2"
                                            fill="none"
                                            animate={{
                                                pathLength: [0, 1, 0]
                                            }}
                                            transition={{
                                                repeat: Infinity,
                                                duration: 4,
                                                ease: "easeInOut",
                                                delay: 0.5
                                            }} />
                                    </g>
                                </svg>
                            </motion.div>
                        </div>
                        <div className="bg-yellow-50 p-4 text-center">
                            <h2 className="text-xl font-bold text-yellow-600">消化阶段</h2>
                            <p className="text-yellow-700">慢慢消化中</p>
                        </div>
                    </motion.div>
                </div>
            </div>
            {}
            <div className="max-w-3xl mx-auto mb-12">
                <motion.div
                    className="bg-white rounded-xl shadow-xl overflow-hidden"
                    initial={{
                        y: 50,
                        opacity: 0
                    }}
                    animate={{
                        y: 0,
                        opacity: 1
                    }}
                    transition={{
                        delay: 0.3
                    }}>
                    <div className="bg-green-600 text-white p-4 text-center">
                        <h2 className="text-2xl font-bold">帮助捕蝇草</h2>
                        <p className="text-green-100">把苍蝇拖进捕蝇草的叶子里！</p>
                    </div>
                    <div
                        id="game-area"
                        className="relative bg-green-100 h-64 md:h-96 p-4"
                        onMouseMove={handleMouseMove}
                        onMouseUp={handleMouseUp}
                        onMouseLeave={handleMouseUp}
                        onTouchMove={handleTouchMove}
                        onTouchEnd={handleTouchEnd}>
                        {}
                        <div
                            ref={leafRef}
                            className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
                            style={{
                                width: "150px",
                                height: "150px"
                            }}>
                            <AnimatePresence>
                                {!isLeafClosed ? <motion.div
                                    initial={{
                                        scale: 1
                                    }}
                                    animate={{
                                        scale: 1
                                    }}
                                    exit={{
                                        scale: 0.9
                                    }}>
                                    <svg
                                        width="100%"
                                        height="100%"
                                        viewBox="0 0 150 150"
                                        xmlns="http://www.w3.org/2000/svg">
                                        <g>
                                            {}
                                            <path d="M75,150 L75,100" stroke="#22c55e" strokeWidth="8" fill="none" />
                                            {}
                                            <path d="M75,100 Q50,80 60,50" stroke="#facc15" strokeWidth="2" fill="#fef08a" />
                                            <path d="M75,100 Q100,80 90,50" stroke="#facc15" strokeWidth="2" fill="#fef08a" />
                                            {}
                                            {[...Array(8)].map((_, i) => <path
                                                key={`game-tooth-left-${i}`}
                                                d={`M${60 + i * 3.5},${50 + i * 1.5} L${55 + i * 3.5},${45 + i * 1.5}`}
                                                stroke="#ef4444"
                                                strokeWidth="2"
                                                fill="none" />)}
                                            {[...Array(8)].map((_, i) => <path
                                                key={`game-tooth-right-${i}`}
                                                d={`M${90 - i * 3.5},${50 + i * 1.5} L${95 - i * 3.5},${45 + i * 1.5}`}
                                                stroke="#ef4444"
                                                strokeWidth="2"
                                                fill="none" />)}
                                        </g>
                                    </svg>
                                </motion.div> : <motion.div
                                    initial={{
                                        scale: 0.9,
                                        opacity: 0
                                    }}
                                    animate={{
                                        scale: 1,
                                        opacity: 1
                                    }}
                                    exit={{
                                        scale: 0.9
                                    }}>
                                    <svg
                                        width="100%"
                                        height="100%"
                                        viewBox="0 0 150 150"
                                        xmlns="http://www.w3.org/2000/svg">
                                        <g>
                                            {}
                                            <path d="M75,150 L75,100" stroke="#22c55e" strokeWidth="8" fill="none" />
                                            {}
                                            <path
                                                d="M75,100 Q65,70 75,50 Q85,70 75,100"
                                                stroke="#facc15"
                                                strokeWidth="2"
                                                fill="#fef08a" />
                                            {}
                                            <circle cx="75" cy="75" r="6" fill="#1f2937" opacity="0.7" />
                                            <path
                                                d="M68,75 L63,72 M68,75 L63,78 M82,75 L87,72 M82,75 L87,78"
                                                stroke="#1f2937"
                                                strokeWidth="1.5"
                                                fill="none"
                                                opacity="0.7" />
                                        </g>
                                    </svg>
                                </motion.div>}
                            </AnimatePresence>
                        </div>
                        {}
                        <AnimatePresence>
                            {!isLeafClosed && <motion.div
                                ref={flyRef}
                                className="absolute cursor-move z-20 touch-none"
                                style={{
                                    left: `${flyPosition.x}px`,
                                    top: `${flyPosition.y}px`,
                                    width: "40px",
                                    height: "40px"
                                }}
                                onMouseDown={handleMouseDown}
                                onTouchStart={handleTouchStart}
                                whileHover={{
                                    scale: 1.1
                                }}
                                animate={{
                                    rotate: isDragging ? 0 : [0, 10, -10, 5, -5, 0]
                                }}
                                transition={{
                                    rotate: {
                                        repeat: Infinity,
                                        duration: 5,
                                        ease: "easeInOut"
                                    },

                                    type: "spring",
                                    stiffness: 300
                                }}>
                                <svg
                                    width="100%"
                                    height="100%"
                                    viewBox="0 0 50 50"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <circle cx="25" cy="25" r="10" fill="#1f2937" />
                                    <path
                                        d="M15,25 L5,20 M15,25 L5,30 M35,25 L45,20 M35,25 L45,30"
                                        stroke="#1f2937"
                                        strokeWidth="2"
                                        fill="none" />
                                    <path d="M25,15 Q35,10 40,15" stroke="#1f2937" strokeWidth="2" fill="none" />
                                    <circle cx="20" cy="22" r="2" fill="white" />
                                    <circle cx="30" cy="22" r="2" fill="white" />
                                </svg>
                            </motion.div>}
                        </AnimatePresence>
                        {}
                        <motion.div
                            className="absolute top-4 left-4 right-4 text-center bg-white bg-opacity-80 p-2 rounded-lg"
                            initial={{
                                opacity: 0
                            }}
                            animate={{
                                opacity: 1
                            }}
                            transition={{
                                delay: 1
                            }}>
                            <p className="text-green-700 font-medium">用手指（或鼠标）抓住苍蝇，拖到捕蝇草的叶子里！</p>
                        </motion.div>
                    </div>
                    {}
                    <div className="bg-green-50 p-4 flex justify-center">
                        <motion.button
                            className="bg-green-500 hover:bg-green-600 text-white py-2 px-6 rounded-full font-bold shadow-md transition-colors"
                            whileHover={{
                                scale: 1.05
                            }}
                            whileTap={{
                                scale: 0.95
                            }}
                            onClick={() => {
                                setIsLeafClosed(false);

                                setFlyPosition({
                                    x: 100,
                                    y: 100
                                });

                                setActiveStage("waiting");
                            }}>再玩一次
                                        </motion.button>
                    </div>
                </motion.div>
            </div>
            {}
            <motion.div
                className="max-w-3xl mx-auto mb-12 bg-white rounded-xl shadow-lg p-6"
                initial={{
                    y: 50,
                    opacity: 0
                }}
                animate={{
                    y: 0,
                    opacity: 1
                }}
                transition={{
                    delay: 0.6
                }}>
                <h2 className="text-2xl font-bold text-green-700 mb-4 text-center">捕蝇草小知识</h2>
                <div className="space-y-4 text-green-800">
                    <p className="flex items-start">
                        <span
                            className="inline-block bg-green-200 rounded-full w-6 h-6 mr-2 flex-shrink-0 flex items-center justify-center text-green-700 font-bold">1</span>捕蝇草是一种会吃虫子的植物，它生长在土壤养分不足的地方。
                                  </p>
                    <p className="flex items-start">
                        <span
                            className="inline-block bg-green-200 rounded-full w-6 h-6 mr-2 flex-shrink-0 flex items-center justify-center text-green-700 font-bold">2</span>当昆虫碰到捕蝇草叶子上的绒毛时，叶子会在0.1秒内迅速关闭！
                                  </p>
                    <p className="flex items-start">
                        <span
                            className="inline-block bg-green-200 rounded-full w-6 h-6 mr-2 flex-shrink-0 flex items-center justify-center text-green-700 font-bold">3</span>捕蝇草消化一只昆虫需要5-10天的时间，然后再次张开等待下一个猎物。
                                  </p>
                </div>
            </motion.div>
            {}
            <footer className="text-center text-green-600 py-4">
                <p>为3岁小朋友设计的捕蝇草科普网站 | 豆包AI生成</p>
                <p className="mt-2 text-sm">© {new Date().getFullYear()}奇妙自然世界</p>
            </footer>
        </div>
    );
}