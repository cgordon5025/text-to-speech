export const OwlModel = ({ nodes, materials }) => {
  return <group name="owl_rig" position={[0.4, 0.177, 0.362]} rotation={[0, -0.834, 0]} scale={0.002}>
    <primitive object={nodes.root_2} />
    <primitive object={nodes['MCH-torsoparent_1']} />
    <primitive object={nodes['MCH-hand_ikparentL']} />
    <primitive object={nodes['MCH-upper_arm_ik_targetparentL']} />
    <primitive object={nodes['MCH-hand_ikparentR']} />
    <primitive object={nodes['MCH-upper_arm_ik_targetparentR']} />
    <primitive object={nodes['MCH-foot_ikparentL_1']} />
    <primitive object={nodes['MCH-thigh_ik_targetparentL_1']} />
    <primitive object={nodes['MCH-foot_ikparentR_1']} />
    <primitive object={nodes['MCH-thigh_ik_targetparentR_1']} />
    <skinnedMesh name="owl_body" geometry={nodes.owl_body.geometry} material={materials.OwlBody} skeleton={nodes.owl_body.skeleton} />
    <skinnedMesh name="owl_bottom_beak" geometry={nodes.owl_bottom_beak.geometry} material={materials.OwlBeakAndTalons} skeleton={nodes.owl_bottom_beak.skeleton} />
    <skinnedMesh name="owl_eyebrows" geometry={nodes.owl_eyebrows.geometry} material={materials.animalBlack} skeleton={nodes.owl_eyebrows.skeleton} />
    <group name="owl_left_foot">
      <skinnedMesh name="owl_l_foot" geometry={nodes.owl_l_foot.geometry} material={materials.animalBlack} skeleton={nodes.owl_l_foot.skeleton} />
      <skinnedMesh name="owl_l_foot_1" geometry={nodes.owl_l_foot_1.geometry} material={materials.OwlBeakAndTalons} skeleton={nodes.owl_l_foot_1.skeleton} />
    </group>
    <skinnedMesh name="owl_left_wing" geometry={nodes.owl_left_wing.geometry} material={materials.OwlLeftWing} skeleton={nodes.owl_left_wing.skeleton} />
    <group name="owl_right_foot">
      <skinnedMesh name="owl_r_foot" geometry={nodes.owl_r_foot.geometry} material={materials.OwlBeakAndTalons} skeleton={nodes.owl_r_foot.skeleton} />
      <skinnedMesh name="owl_r_foot_1" geometry={nodes.owl_r_foot_1.geometry} material={materials.animalBlack} skeleton={nodes.owl_r_foot_1.skeleton} />
    </group>
    <skinnedMesh name="owl_right_wing" geometry={nodes.owl_right_wing.geometry} material={materials.OwlRightWing} skeleton={nodes.owl_right_wing.skeleton} />
    <skinnedMesh name="owl_tail" geometry={nodes.owl_tail.geometry} material={materials.OwlBrown} skeleton={nodes.owl_tail.skeleton} />
    <skinnedMesh name="owl_tongue" geometry={nodes.owl_tongue.geometry} material={materials.Gums} skeleton={nodes.owl_tongue.skeleton} />
    <skinnedMesh name="owl_top_beak" geometry={nodes.owl_top_beak.geometry} material={materials.OwlBeakAndTalons} skeleton={nodes.owl_top_beak.skeleton} />
  </group>
}
