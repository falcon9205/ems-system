export const razorpayPayment = async ({ amount, onSuccess, onFailure }) => {
    console.log("razor api");
    
    try {
      const res = await fetch("/api/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount }), // Pass the amount to your API
      });
      
      const data = await res.json();
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_ID,
        amount: amount * 100, // Convert to paisa
        currency: "INR",
        name: "ilearnings",
        description: "Testing Razorpay transaction",
        order_id: data.orderId, // Order ID from the backend
        handler: function (response) {
          console.log("Payment successful", response);
          onSuccess(response); // Call success callback
        },
        prefill: {
          name: "John Doe", // Replace with dynamic user data if needed
          email: "data@gmail.com",
          contact: "9999999999",
        },
        theme: {
          color: "#3399cc",
        },
      };
  
      const rzp1 = new window.Razorpay(options);
      rzp1.open();
    } catch (error) {
      console.error("Payment failed", error);
      onFailure(error); // Call failure callback
    }
  };
  