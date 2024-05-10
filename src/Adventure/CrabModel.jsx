export const CrabModel = ({ nodes, materials }) => {
    return <group name="crab_rig" position={[0.391, 0.175, 0.37]} rotation={[Math.PI, -1.404, Math.PI]} scale={0.001}>
        <primitive object={nodes.root_1} />
        <primitive object={nodes['MCH-Arm_ikparentL002']} />
        <primitive object={nodes['MCH-Arm_ik_targetparentL']} />
        <primitive object={nodes['MCH-Arm_ikparentR002']} />
        <primitive object={nodes['MCH-Arm_ik_targetparentR']} />
        <skinnedMesh name="crab_body" geometry={nodes.crab_body.geometry} material={materials.CrabBody} skeleton={nodes.crab_body.skeleton} />
        <skinnedMesh name="crab_l_arm" geometry={nodes.crab_l_arm.geometry} material={materials.CrabBody} skeleton={nodes.crab_l_arm.skeleton} />
        <skinnedMesh name="crab_l_leg_1" geometry={nodes.crab_l_leg_1.geometry} material={materials.CrabBody} skeleton={nodes.crab_l_leg_1.skeleton} />
        <skinnedMesh name="crab_l_leg_2" geometry={nodes.crab_l_leg_2.geometry} material={materials.CrabBody} skeleton={nodes.crab_l_leg_2.skeleton} />
        <skinnedMesh name="crab_l_leg_3" geometry={nodes.crab_l_leg_3.geometry} material={materials.CrabBody} skeleton={nodes.crab_l_leg_3.skeleton} />
        <skinnedMesh name="crab_r_arm" geometry={nodes.crab_r_arm.geometry} material={materials.CrabBody} skeleton={nodes.crab_r_arm.skeleton} />
        <skinnedMesh name="crab_r_leg_1" geometry={nodes.crab_r_leg_1.geometry} material={materials.CrabBody} skeleton={nodes.crab_r_leg_1.skeleton} />
        <skinnedMesh name="crab_r_leg_2" geometry={nodes.crab_r_leg_2.geometry} material={materials.CrabBody} skeleton={nodes.crab_r_leg_2.skeleton} />
        <skinnedMesh name="crab_r_leg_3" geometry={nodes.crab_r_leg_3.geometry} material={materials.CrabBody} skeleton={nodes.crab_r_leg_3.skeleton} />
    </group>
}