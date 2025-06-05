import { Sword, Shield, ArrowLeft, Footprints, Crosshair } from 'lucide-react';

const BattleMenu = ({
    menuState,
    handleClick,
    handlePlayerAttack,
    handlePlayerDefend,
    setMenuState,
    showMessage,
    turnIndex,
    getCombatantType,
}) => (
    <>
        {menuState === 'main' && (
            <div className="battle-menu-box">
                <div className="battle-menu">
                    <button onClick={() => handleClick(() => setMenuState('fight'))}>
                        <Crosshair size={20} style={{ marginRight: 8 }} />
                        Luchar
                    </button>
                    <button onClick={() => handleClick(() => showMessage('¡Escapaste de la batalla!', 2000))}>
                        <Footprints size={20} style={{ marginRight: 8 }} />
                        Correr
                    </button>
                </div>
            </div>
        )}
        {menuState === 'fight' && (
            <div className="battle-menu-box">
                <div className="battle-menu">
                    {getCombatantType(turnIndex) === 'player' ? (
                        <>
                            <button onClick={() => handleClick(handlePlayerAttack)}>
                                <Sword size={20} style={{ marginRight: 8 }} />
                                Ataque
                            </button>
                            <button onClick={() => handleClick(handlePlayerDefend)}>
                                <Shield size={20} style={{ marginRight: 8 }} />
                                Defender
                            </button>
                            <button onClick={() => handleClick(() => setMenuState('main'))}>
                                <ArrowLeft size={20} style={{ marginRight: 8 }} />
                                Atrás
                            </button>
                        </>
                    ) : (
                        <div className="waiting-message">
                            Esperando turno...
                        </div>
                    )}
                </div>
            </div>
        )}
    </>
);

export default BattleMenu;