import React, { createContext, useState } from "react";

export const FOOD_STATUS = {
  AVAILABLE: "available",
  CLAIMED: "claimed",
  PICKUP_ASSIGNED: "pickup_assigned",
  PICKED_UP: "picked_up",
  DELIVERED: "delivered",
  EXPIRED: "expired",
  CANCELLED: "cancelled"
};

export const FoodContext = createContext();

export const FoodProvider = ({ children }) => {
  const [foodListings, setFoodListings] = useState([]);

  // Add a new food listing
  const addFood = (food) => {
    const newFood = {
      ...food,
      id: Date.now().toString(),
      status: FOOD_STATUS.AVAILABLE,
      createdAt: new Date().toISOString(),
      claimedBy: null,
      volunteer: null,
      deliveredAt: null
    };
    setFoodListings(prev => [newFood, ...prev]);
    return newFood;
  };

  // Update food listing
  const updateFood = (id, updates) => {
    setFoodListings(prev =>
      prev.map(food =>
        food.id === id ? { ...food, ...updates } : food
      )
    );
  };

  // Cancel a food listing
  const cancelFood = (id, reason) => {
    setFoodListings(prev =>
      prev.map(food =>
        food.id === id
          ? { ...food, status: FOOD_STATUS.CANCELLED, cancelReason: reason, cancelledAt: new Date().toISOString() }
          : food
      )
    );
  };

  // Claim food by NGO
  const claimFood = (id, ngoName) => {
    setFoodListings(prev =>
      prev.map(food =>
        food.id === id
          ? { ...food, status: FOOD_STATUS.CLAIMED, claimedBy: ngoName, claimedAt: new Date().toISOString() }
          : food
      )
    );
  };

  // Assign volunteer to pickup
  const assignVolunteer = (id, volunteerName, volunteerId) => {
    setFoodListings(prev =>
      prev.map(food =>
        food.id === id
          ? {
            ...food,
            status: FOOD_STATUS.PICKUP_ASSIGNED,
            volunteer: volunteerName,
            volunteerId,
            assignedAt: new Date().toISOString()
          }
          : food
      )
    );
  };

  // Mark as picked up
  const markPickedUp = (id, pickupDetails = {}) => {
    setFoodListings(prev =>
      prev.map(food =>
        food.id === id
          ? {
            ...food,
            status: FOOD_STATUS.PICKED_UP,
            pickedUpAt: new Date().toISOString(),
            pickupPhoto: pickupDetails.photo || null
          }
          : food
      )
    );
  };

  // Mark as delivered
  const markDelivered = (id, deliveryDetails = {}) => {
    setFoodListings(prev =>
      prev.map(food =>
        food.id === id
          ? {
            ...food,
            status: FOOD_STATUS.DELIVERED,
            deliveredAt: new Date().toISOString(),
            deliveryPhoto: deliveryDetails.photo || null,
            recipientName: deliveryDetails.recipientName || null,
            deliveryNotes: deliveryDetails.notes || null
          }
          : food
      )
    );
  };

  // Get food by status
  const getFoodByStatus = (status) => {
    return foodListings.filter(food => food.status === status);
  };

  // Get food by donor
  const getFoodByDonor = (donorId) => {
    return foodListings.filter(food => food.donorId === donorId);
  };

  // Get available food (for NGOs)
  const getAvailableFood = () => {
    return foodListings.filter(food => food.status === FOOD_STATUS.AVAILABLE);
  };

  // Rate a donation
  const rateDonation = (id, rating, feedback) => {
    setFoodListings(prev =>
      prev.map(food =>
        food.id === id
          ? { ...food, rating, feedback, ratedAt: new Date().toISOString() }
          : food
      )
    );
  };

  return (
    <FoodContext.Provider
      value={{
        foodListings,
        addFood,
        updateFood,
        cancelFood,
        claimFood,
        assignVolunteer,
        markPickedUp,
        markDelivered,
        getFoodByStatus,
        getFoodByDonor,
        getAvailableFood,
        rateDonation,
        FOOD_STATUS
      }}
    >
      {children}
    </FoodContext.Provider>
  );
};
