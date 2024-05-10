export const DogModel = ({ nodes, materials }) => {
  return <group name="dog_rig" position={[0.183, 0.034, 1.211]} scale={0.018}>
    <primitive object={nodes.root} />
    <primitive object={nodes['MCH-torsoparent']} />
    <primitive object={nodes['MCH-front_foot_ikparentL']} />
    <primitive object={nodes['MCH-front_thigh_ik_targetparentL']} />
    <primitive object={nodes['MCH-front_foot_ikparentR']} />
    <primitive object={nodes['MCH-front_thigh_ik_targetparentR']} />
    <primitive object={nodes['MCH-foot_ikparentL']} />
    <primitive object={nodes['MCH-thigh_ik_targetparentL']} />
    <primitive object={nodes['MCH-foot_ikparentR']} />
    <primitive object={nodes['MCH-thigh_ik_targetparentR']} />
    <group name="dog_body">
      <skinnedMesh name="dog_body_1" geometry={nodes.dog_body_1.geometry} material={materials.DogBody} skeleton={nodes.dog_body_1.skeleton} />
      <skinnedMesh name="dog_body_2" geometry={nodes.dog_body_2.geometry} material={materials.animalBlack} skeleton={nodes.dog_body_2.skeleton} />
    </group>
    <group name="dog_bottom_teeth">
      <skinnedMesh name="dog_bottom_teeth_1" geometry={nodes.dog_bottom_teeth_1.geometry} material={materials.Teeth} skeleton={nodes.dog_bottom_teeth_1.skeleton} />
      <skinnedMesh name="dog_bottom_teeth_2" geometry={nodes.dog_bottom_teeth_2.geometry} material={materials.Gums} skeleton={nodes.dog_bottom_teeth_2.skeleton} />
    </group>
    <group name="dog_collar">
      <skinnedMesh name="collar_geo" geometry={nodes.collar_geo.geometry} material={materials.CollarRed} skeleton={nodes.collar_geo.skeleton} />
      <skinnedMesh name="collar_geo_1" geometry={nodes.collar_geo_1.geometry} material={materials.Buckle} skeleton={nodes.collar_geo_1.skeleton} />
    </group>
    <group name="dog_l_eyeball">
      <skinnedMesh name="dog_l_eyeball_1" geometry={nodes.dog_l_eyeball_1.geometry} material={materials.Cornea} skeleton={nodes.dog_l_eyeball_1.skeleton} />
      <skinnedMesh name="dog_l_eyeball_2" geometry={nodes.dog_l_eyeball_2.geometry} material={materials.IrisPupil} skeleton={nodes.dog_l_eyeball_2.skeleton} />
    </group>
    <skinnedMesh name="dog_l_eyelash" geometry={nodes.dog_l_eyelash.geometry} material={materials.animalBlack} skeleton={nodes.dog_l_eyelash.skeleton} />
    <skinnedMesh name="dog_nose" geometry={nodes.dog_nose.geometry} material={materials.animalBlack} skeleton={nodes.dog_nose.skeleton} />
    <group name="dog_r_eyeball">
      <skinnedMesh name="dog_r_eyeball_1" geometry={nodes.dog_r_eyeball_1.geometry} material={materials.Cornea} skeleton={nodes.dog_r_eyeball_1.skeleton} />
      <skinnedMesh name="dog_r_eyeball_2" geometry={nodes.dog_r_eyeball_2.geometry} material={materials.IrisPupil} skeleton={nodes.dog_r_eyeball_2.skeleton} />
    </group>
    <skinnedMesh name="dog_r_eyelash" geometry={nodes.dog_r_eyelash.geometry} material={materials.animalBlack} skeleton={nodes.dog_r_eyelash.skeleton} />
    <skinnedMesh name="dog_tongue" geometry={nodes.dog_tongue.geometry} material={materials.Gums} skeleton={nodes.dog_tongue.skeleton} />
  </group>
}