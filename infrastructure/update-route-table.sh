#!/bin/bash

# AWS Resource IDs from your environment
VPC_ID="vpc-0208d4ec541c4cc4"
PRIVATE_SUBNET_IDS=("subnet-06d23fd268afe27a9" "subnet-0768d2f6c1f5f4c53")
PUBLIC_SUBNET_IDS=("subnet-06e4587ce9a89f80a" "subnet-02735e0c78222fe34")
NAT_GATEWAY_IDS=("nat-0427e7a6797aa6e9b" "nat-05cad1ca2e1ab769a" "nat-01c78a32f08899a7")

# Create route tables for private subnets to route through NAT Gateway
for subnet_id in "${PRIVATE_SUBNET_IDS[@]}"; do
  # Create a new route table
  route_table_id=$(aws ec2 create-route-table --vpc-id "$VPC_ID" --query 'RouteTable.RouteTableId' --output text)
  echo "Created route table $route_table_id for subnet $subnet_id"
  
  # Associate the route table with the subnet
  aws ec2 associate-route-table --route-table-id "$route_table_id" --subnet-id "$subnet_id"
  echo "Associated route table $route_table_id with subnet $subnet_id"
  
  # Add a route to the internet through the NAT Gateway
  # Using the first NAT Gateway for simplicity - in production you might want to use different NAT Gateways for different subnets
  aws ec2 create-route --route-table-id "$route_table_id" --destination-cidr-block "0.0.0.0/0" --nat-gateway-id "${NAT_GATEWAY_IDS[0]}"
  echo "Added route to the internet through NAT Gateway ${NAT_GATEWAY_IDS[0]} for route table $route_table_id"
done

echo "Route tables updated successfully."