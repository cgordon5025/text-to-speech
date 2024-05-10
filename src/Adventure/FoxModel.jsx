export const FoxModel = ({ nodes, materials }) => {
  return <group name="fox_rig" position={[0.183, 0.034, 1.211]} rotation={[0, -0.004, 0]} scale={0.001}>
    <primitive object={nodes.root_3} />
    <primitive object={nodes['MCH-torsoparent_2']} />
    <primitive object={nodes['MCH-front_foot_ikparentL_1']} />
    <primitive object={nodes['MCH-front_thigh_ik_targetparentL_1']} />
    <primitive object={nodes['MCH-front_foot_ikparentR_1']} />
    <primitive object={nodes['MCH-front_thigh_ik_targetparentR_1']} />
    <primitive object={nodes['MCH-foot_ikparentL_2']} />
    <primitive object={nodes['MCH-thigh_ik_targetparentL_2']} />
    <primitive object={nodes['MCH-foot_ikparentR_2']} />
    <primitive object={nodes['MCH-thigh_ik_targetparentR_2']} />
    <group name="fox_body">
      <skinnedMesh name="fox_body_1" geometry={nodes.fox_body_1.geometry} material={materials.FoxBody} skeleton={nodes.fox_body_1.skeleton} />
      <skinnedMesh name="fox_body_2" geometry={nodes.fox_body_2.geometry} material={materials.animalBlack} skeleton={nodes.fox_body_2.skeleton} />
    </group>
    <skinnedMesh name="fox_head_hair" geometry={nodes.fox_head_hair.geometry} material={materials.FoxBody} skeleton={nodes.fox_head_hair.skeleton} />
    <group name="fox_l_eyeball">
      <skinnedMesh name="fox_l_eyeball_1" geometry={nodes.fox_l_eyeball_1.geometry} material={materials.Cornea} skeleton={nodes.fox_l_eyeball_1.skeleton} />
      <skinnedMesh name="fox_l_eyeball_2" geometry={nodes.fox_l_eyeball_2.geometry} material={materials.IrisPupil} skeleton={nodes.fox_l_eyeball_2.skeleton} />
    </group>
    <skinnedMesh name="fox_l_eyebrow" geometry={nodes.fox_l_eyebrow.geometry} material={materials.animalBlack} skeleton={nodes.fox_l_eyebrow.skeleton} />
    <skinnedMesh name="fox_nose" geometry={nodes.fox_nose.geometry} material={materials.animalBlack} skeleton={nodes.fox_nose.skeleton} />
    <group name="fox_r_eyeball">
      <skinnedMesh name="fox_r_eyeball_1" geometry={nodes.fox_r_eyeball_1.geometry} material={materials.Cornea} skeleton={nodes.fox_r_eyeball_1.skeleton} />
      <skinnedMesh name="fox_r_eyeball_2" geometry={nodes.fox_r_eyeball_2.geometry} material={materials.IrisPupil} skeleton={nodes.fox_r_eyeball_2.skeleton} />
    </group>
    <skinnedMesh name="fox_r_eyebrow" geometry={nodes.fox_r_eyebrow.geometry} material={materials.animalBlack} skeleton={nodes.fox_r_eyebrow.skeleton} />
  </group>
}